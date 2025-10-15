/**
 * Controller functions for handling XML parsing, data extraction, and persistence.
 */
import xml2js from "xml2js";
import Report from "../models/Report.js";

/**
 * Safely extracts a primitive value from a nested object path.
 */
const safeGet = (obj, path) => {
	try {
		let value = obj;
		const parts = path.split(".");

		for (const part of parts) {
			if (value === undefined || value === null) return null;
			if (Array.isArray(value)) {
				value = value[0];
				if (value === undefined || value === null) return null;
			}
			value = value[part];
		}

		if (Array.isArray(value)) value = value[0];
		if (value === "" || value === null || value === undefined) return null;

		return String(value);
	} catch (e) {
		return null;
	}
};

/**
 * Safely extracts an array from a nested object path, handling single objects by wrapping them in an array.
 */
const safeGetArray = (obj, path) => {
	const parts = path.split(".");
	let rawParsed = obj;

	for (const part of parts) {
		if (rawParsed === undefined || rawParsed === null) return [];
		if (Array.isArray(rawParsed)) rawParsed = rawParsed[0];
		rawParsed = rawParsed ? rawParsed[part] : null;
	}

	if (Array.isArray(rawParsed)) return rawParsed;
	if (rawParsed) return [rawParsed]; // Convert single object to array

	return [];
};

/**
 * Handles XML file upload, parsing, data extraction, and saving the report to the database.
 */
export const uploadAndProcessReport = async (req, res) => {
	if (
		!req.file ||
		(req.file.mimetype !== "text/xml" &&
			!req.file.originalname.endsWith(".xml"))
	) {
		return res
			.status(400)
			.json({ message: "Invalid file format. Must be XML." });
	}

	try {
		const xmlContent = req.file.buffer.toString();
		const parser = new xml2js.Parser({
			explicitArray: false, // Prevents single child elements from being wrapped
			mergeAttrs: true, // Merges XML attributes
		});
		const result = await parser.parseStringPromise(xmlContent);

		const data = result.INProfileResponse;
		if (!data) {
			return res
				.status(400)
				.json({
					message:
						"Invalid XML structure. Missing INProfileResponse root.",
				});
		}

		const currentAppDetails =
			data.Current_Application?.Current_Application_Details || null;
		const applicantDetails =
			currentAppDetails?.Current_Applicant_Details || null;
		const caisAccount = data.CAIS_Account || null;
		const caisSummary = caisAccount?.CAIS_Summary || null;

		const extractedData = {
			report_metadata: {
				header: data.Header || null,
				credit_profile_header: data.CreditProfileHeader || null,
				match_result: data.Match_result || null,
				score_details: data.SCORE || null,
			},
			current_application_details: {
				application_info: currentAppDetails,
				applicant_details: applicantDetails,
				applicant_other_details:
					currentAppDetails?.Current_Other_Details || null,
				applicant_address:
					currentAppDetails?.Current_Applicant_Address_Details ||
					null,
			},

			basic_details: {
				name: `${safeGet(applicantDetails, "First_Name") || ""} ${
					safeGet(applicantDetails, "Last_Name") || ""
				}`.trim(),
				mobile_phone: safeGet(applicantDetails, "MobilePhoneNumber"),
				pan: safeGet(
					caisAccount,
					"CAIS_Account_DETAILS.CAIS_Holder_Details.Income_TAX_PAN"
				),
				credit_score: Number(safeGet(data, "SCORE.BureauScore")),
				date_of_birth: safeGet(
					caisAccount,
					"CAIS_Account_DETAILS.CAIS_Holder_Details.Date_of_birth"
				),
				report_date: safeGet(data, "CreditProfileHeader.ReportDate"),
				score_confidence_level: safeGet(
					data,
					"SCORE.BureauScoreConfidLevel"
				),
			},

			report_summary: caisAccount
				? {
						credit_account: caisSummary?.Credit_Account || null,
						total_outstanding_balance:
							caisSummary?.Total_Outstanding_Balance || null,
				  }
				: {},
			total_caps_summary: data.TotalCAPS_Summary || null,
			caps_summary: data.CAPS?.CAPS_Summary || null,
			credit_accounts: [],
		};

		const rawAccounts = safeGetArray(caisAccount, "CAIS_Account_DETAILS");

		for (const account of rawAccounts) {
			const historyArray = safeGetArray(account, "CAIS_Account_History");
			const holderAddress = safeGet(
				account,
				"CAIS_Holder_Address_Details"
			);

			const newAccount = {
				account_number: safeGet(account, "Account_Number"),
				subscriber_name: safeGet(account, "Subscriber_Name").trim(),
				portfolio_type: safeGet(account, "Portfolio_Type"),
				account_type: safeGet(account, "Account_Type"),
				account_status: safeGet(account, "Account_Status"),
				current_balance: safeGet(account, "Current_Balance"),
				amount_overdue: safeGet(account, "Amount_Past_Due"),
				open_date: safeGet(account, "Open_Date"),
				credit_limit: safeGet(account, "Credit_Limit_Amount"),
				highest_credit_or_original_loan_amount: safeGet(
					account,
					"Highest_Credit_or_Original_Loan_Amount"
				),
				payment_rating: safeGet(account, "Payment_Rating"),
				date_reported: safeGet(account, "Date_Reported"),
				date_closed: safeGet(account, "Date_Closed"),

				history: historyArray.map((h) => ({
					year: h.Year,
					month: h.Month,
					days_past_due: h.Days_Past_Due,
					asset_classification: h.Asset_Classification,
				})),
				holder_details: account.CAIS_Holder_Details || null,
				address_details: holderAddress,
				holder_id_details: safeGetArray(
					account,
					"CAIS_Holder_ID_Details"
				),
			};
			extractedData.credit_accounts.push(newAccount);
		}

		const newReport = new Report(extractedData);
		await newReport.save();

		res.status(201).json({
			message: "Full report uploaded and processed successfully",
			reportId: newReport._id,
		});
	} catch (error) {
		console.error("Error processing XML file:", error);
		res.status(500).json({
			message: "Server failed to process the uploaded file.",
			error: error.message,
		});
	}
};

/**
 * Retrieves a report by its ID. Uses .lean() for faster JSON output.
 */
export const getReportById = async (req, res) => {
	try {
		// Use .lean() to return a plain JavaScript object (POJO)
		const report = await Report.findById(req.params.id).lean();

		if (!report) {
			return res.status(404).json({ message: "Report not found." });
		}

		res.status(200).json(report);
	} catch (error) {
		console.error(`Error fetching report ID ${req.params.id}:`, error);
		res.status(500).json({
			message: "Error fetching report data.",
			error: error.message,
		});
	}
};
