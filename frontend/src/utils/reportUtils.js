import { CreditCard } from "lucide-react";
import { formatCurrency, formatDate, mapCode } from "./dataUtils";

/**
 * Maps credit score confidence codes (H, M, L) to descriptive text.
 */
const confidenceMap = {
	H: "High",
	M: "Medium",
	L: "Low",
};

/**
 * Gets the Tailwind color class based on the confidence level text.
 */
export const getConfidenceColor = (level) => {
	switch (level) {
		case "High":
			return "text-success";
		case "Medium":
			return "text-warning";
		case "Low":
			return "text-error";
		default:
			return "text-base-content/60";
	}
};

/**
 * Processes report data, extracting derived fields and applying necessary formatting.
 */
export const processConsumerData = (data) => {
	const {
		name,
		mobile_phone,
		pan,
		credit_score,
		date_of_birth,
		report_date,
		score_confidence_level,
	} = data || {};

	const confidenceText = score_confidence_level
		? confidenceMap[score_confidence_level] || "N/A"
		: "N/A";

	return {
		fullName: name || "N/A",
		mobile_phone: mobile_phone || "N/A",
		pan: pan || "N/A",
		credit_score: credit_score,
		formattedDOB: date_of_birth, // Use formatDate from dataUtils
		formattedReportDate: report_date, // Use formatDate from dataUtils
		confidence: confidenceText,
		confidenceColor: getConfidenceColor(confidenceText),
	};
};

/**
 * Processes data from report_summary to generate pre-formatted strings for PortfolioSummary.
 */
export const processPortfolioSummaryData = (data) => {
	const credit = data?.credit_account || {};
	const balance = data?.total_outstanding_balance || {};
	const caps = data?.caps_summary || {};
	const totalCaps = data?.total_caps_summary || {};

	// 1. Secured vs. Unsecured Breakdown
	const securedValue = balance.Outstanding_Balance_Secured;
	const unsecuredValue = balance.Outstanding_Balance_UnSecured;
	const securedPercent = balance.Outstanding_Balance_Secured_Percentage || 0;
	const unsecuredPercent =
		balance.Outstanding_Balance_UnSecured_Percentage || 0;

	const securedDetail1 = `Secured: ${formatCurrency(
		securedValue
	)} (${securedPercent}%)`;
	const securedDetail2 = `Unsecured: ${formatCurrency(
		unsecuredValue
	)} (${unsecuredPercent}%)`;

	// 2. Enquiries (Last 7 Days)
	const last7DaysCaps = caps.CAPSLast7Days;
	const last30DaysCaps = caps.CAPSLast30Days;
	const last180DaysCaps = totalCaps.TotalCAPSLast180Days;

	const enquiriesDetail1 = `Last 30 Days: ${last30DaysCaps ?? 0}`;
	const enquiriesDetail2 = `Last 180 Days: ${last180DaysCaps ?? 0}`;

	return {
		credit,
		balance,
		last7DaysCaps,
		securedDetail1,
		securedDetail2,
		enquiriesDetail1,
		enquiriesDetail2,
	};
};

/**
 * Processes a single credit account object for rendering in a row component.
 * Applies mapping, formatting, and determines status states.
 */
export const processCreditAccount = (acc) => {
	const isPastDue = acc.amount_past_due > 0;

	const ACCOUNT_COLORS = {
		standard: { icon: "text-primary", bg: "bg-primary/5" },
		pastDue: { icon: "text-error", bg: "bg-error/10" },
	};

	const colorConfig = isPastDue
		? ACCOUNT_COLORS.pastDue
		: ACCOUNT_COLORS.standard;

	const IconComponent = isPastDue ? AlertTriangle : CreditCard; // Assuming AlertTriangle and CreditCard are imported in the consuming component

	const accountType = mapCode(acc.account_type, "ACCOUNT_TYPE");
	const accountStatus = mapCode(acc.account_status, "ACCOUNT_STATUS");

	// Detail Data for Collapsed Section
	const detailLeft1 = `Original Loan: ${formatCurrency(
		acc.highest_credit_or_original_loan_amount
	)}`;
	const detailLeft2 = `Payment Rating: ${
		acc.payment_rating !== null && acc.payment_rating !== undefined
			? acc.payment_rating
			: "N/A"
	}`;
	const detailLeft3 = `Open Date: ${formatDate(acc.open_date)}`;
	const detailLeft4 = `Date Reported: ${formatDate(acc.date_reported)}`;
	const detailLeft5 = `Date Closed: ${formatDate(acc.date_closed)}`;

	return {
		isPastDue,
		colorConfig,
		IconComponent,
		accountType,
		accountStatus,
		detailLeft1,
		detailLeft2,
		detailLeft3,
		detailLeft4,
		detailLeft5,
	};
};
