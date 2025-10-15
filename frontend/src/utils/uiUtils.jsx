import React from "react";
import { formatCurrency, formatDate } from "./dataUtils";

/**
 * Parses a detail string (e.g., "Label: Value (Optional)") to render the label
 * and the optional percentage/parenthetical part in regular text, but the main
 * value part in bold.
 */
export const renderBoldDetail = (detail) => {
	if (!detail) return null;

	const parts = detail.split(":");
	// If no colon is present (not a standard key:value detail), return unformatted text.
	if (parts.length < 2) {
		return (
			<div className="text-base-content/70">{detail}</div>
		);
	}

	const valuePart = parts[1].trim();

	// Regex to split the main value from the optional parenthetical part (e.g., '(50%)')
	const valueWithoutParentheses = valuePart.replace(/\s\(.*\)/, "").trim();
	const percentPart = valuePart.match(/\s\(.*\)/)
		? valuePart.match(/\s\(.*\)/)[0]
		: "";

	return (
		<div className="flex justify-between">
			<span className="text-base-content/70">{parts[0].trim()}:</span>
			<span>
				<span className="font-extrabold text-base-content/90">
					{valueWithoutParentheses}
				</span>
				<span className="text-base-content/70">{percentPart}</span>
			</span>
		</div>
	);
};

/**
 * Converts a raw data key (snake_case, PascalCase, or array index) into a
 * Clean Display Label (Title Case).
 */
export const getCleanLabel = (rawKey) => {
	// Case 1: Array index (e.g., '0' -> 'Item 1')
	if (!isNaN(parseInt(rawKey)) && String(parseInt(rawKey)) === rawKey) {
		return `Item ${parseInt(rawKey) + 1}`;
	}

	// Case 2: Convert snake_case or PascalCase to title case
	let clean = rawKey
		.replace(/([A-Z])/g, " $1") // Add space before uppercase letters (for PascalCase)
		.replace(/_/g, " ") // Replace underscores (for snake_case)
		.toLowerCase()
		.trim();

	// Title case conversion
	clean = clean
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

	return clean;
};

/**
 * Determines the best display format for a field value based on its key,
 * applying currency and date formatting where appropriate.
 */
export const formatDeepDetailValue = (key, value) => {
	if (value === null || value === undefined || value === "") return "N/A";

	const valString = String(value);
	const lowerKey = key.toLowerCase();

	// 1. Currency/Amount Formatting heuristics
	const isCurrency =
		lowerKey.includes("amount") ||
		lowerKey.includes("balance") ||
		lowerKey.includes("limit") ||
		lowerKey.includes("credit") ||
		lowerKey.includes("income");

	if (isCurrency) {
		if (!isNaN(Number(value)) && Number(value) !== 0) {
			return formatCurrency(value);
		}
	}

	// 2. Date Formatting (Looks for YYYYMMDD or YYYYMM pattern)
	if (lowerKey.includes("date") && valString.match(/^\d{6,8}$/)) {
		return formatDate(valString);
	}

	// 3. Simple Text Display (e.g., codes, names, or non-numeric values)
	return valString;
};

/**
 * Determines the Tailwind/DaisyUI badge classes for a given Days Past Due (DPD) value.
 * Logic is tied to the color scheme used for payment history.
 */
export const getHistoryBadge = (days) => {
	const d = parseInt(days, 10);
	if (isNaN(d) || d < 0) return "bg-neutral text-neutral-content"; // No data / Invalid

	if (d === 0) return "bg-success text-success-content font-bold"; // Current/Zero DPD
	if (d <= 30) return "bg-warning/80 text-warning-content font-bold"; // 1-30 DPD
	if (d <= 90) return "bg-error/80 text-error-content font-bold"; // 31-90 DPD
	return "bg-red-800 text-white font-bold"; // Severe default (> 90)
};

/**
 * Generates the descriptive text for the payment history tooltip, including DPD and classification.
 */
export const getTooltipText = (h) => {
	if (!h) return "No Data Reported";
	const dpd = parseInt(h.days_past_due, 10);
	const classification = h.asset_classification || "N/A";

	let status = "On Time";
	if (dpd > 0) status = `${dpd} Days Past Due`;

	// Append classification unless it is 'N/A' or the common '00' code
	if (classification !== "N/A" && classification !== "00")
		status += ` (Class: ${classification})`;

	return `${h.month}/${h.year} | Status: ${status}`;
};
