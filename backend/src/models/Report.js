/**
 * Defines Mongoose schemas for the Credit Account sub-document and the main Report document.
 */
import mongoose from "mongoose";

// Sub-Schema for a single Credit Account
const AccountSchema = new mongoose.Schema({
	// Core fields stored as Strings to prevent automatic type coercion
	account_number: { type: String, required: true },
	subscriber_name: String,
	portfolio_type: String,
	account_type: String,
	account_status: String,
	payment_rating: String,
	current_balance: String,
	amount_overdue: String,

	open_date: String,
	credit_limit: String,
	highest_credit_or_original_loan_amount: String,
	date_reported: String,
	date_closed: String,

	// Nested structures
	history: [
		{
			year: String,
			month: String,
			days_past_due: String,
			asset_classification: String,
		},
	],
	holder_details: Object,
	address_details: Object,
	holder_id_details: Array,
});

// Main Report Schema
const ReportSchema = new mongoose.Schema({
	upload_date: { type: Date, default: Date.now },

	report_metadata: Object,
	current_application_details: Object,

	basic_details: {
		name: String,
		mobile_phone: String,
		pan: String,
		credit_score: Number,

		// Extracted core fields
		date_of_birth: String,
		report_date: String,
		score_confidence_level: String,
	},

	report_summary: Object,
	total_caps_summary: Object,
	caps_summary: Object,

	credit_accounts: [AccountSchema],
});

const Report = mongoose.model("Report", ReportSchema);
export default Report;
