/**
 * Utility functions for data formatting and mapping used across the frontend.
 */

// Mapping constants for cleaner code structure
const ACCOUNT_TYPE_MAP = {
	10: "Credit Card",
	51: "Housing Loan",
	52: "Personal Loan",
	53: "Auto Loan",
	55: "Two Wheeler Loan",
};

const ACCOUNT_STATUS_MAP = {
	11: "Active (Standard)",
	13: "Closed",
	53: "Written Off",
	71: "Settled",
};

/**
 * Formats a string amount into Indian Rupee (INR) currency format.
 */
export const formatCurrency = (amount) => {
	if (amount === null || amount === undefined || amount === "") {
		return "N/A";
	}

	const num = Number(amount);

	if (isNaN(num)) {
		return "N/A";
	}

	if (num === 0) {
		return "₹0";
	}

	return `₹${num.toLocaleString("en-IN", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	})}`;
};

/**
 * Formats XML date strings (YYYYMMDD) to YYYY-MM-DD format.
 */
export const formatDate = (dateString) => {
	const s = String(dateString || "").trim();

	if (!s || s === "0" || s.length !== 8 || s.startsWith("0000")) return "N/A";

	const year = s.substring(0, 4);
	const month = s.substring(4, 6);
	const day = s.substring(6, 8);
	return `${year}-${month}-${day}`;
};

/**
 * Maps credit bureau codes (e.g., Account Type, Status) to human-readable strings.
 */
export const mapCode = (code, type) => {
	const map =
		type === "ACCOUNT_TYPE"
			? ACCOUNT_TYPE_MAP
			: type === "ACCOUNT_STATUS"
			? ACCOUNT_STATUS_MAP
			: null;

	if (!map) return code;

	const result = map[code];

	if (result) {
		return result;
	} else {
		const typeName = type
			.split("_")
			.map((word) => word.charAt(0) + word.slice(1).toLowerCase())
			.join(" ");
		return `${typeName} ${code}`;
	}
};

/**
 * Creates a deep copy of a data object via JSON serialization/deserialization.
 */
export const sanitizeData = (data) =>
	data ? JSON.parse(JSON.stringify(data)) : {};

/**
 * Recursively removes empty objects, empty arrays, null, undefined, and empty strings
 * from a data structure to clean it up for display.
 */
export const smartPruneData = (data) => {
	if (typeof data !== "object" || data === null) {
		return data;
	}

	if (Array.isArray(data)) {
		const cleanedArray = data.map(smartPruneData).filter((item) => {
			// Filter out primitives that are undefined
			if (typeof item !== "object" || item === null)
				return item !== undefined;
			// Filter out objects that are now empty
			return Object.keys(item).length > 0;
		});
		return cleanedArray;
	}

	const cleanedObject = {};
	for (const [key, value] of Object.entries(data)) {
		const cleanedValue = smartPruneData(value);

		const isEmptyObject =
			typeof cleanedValue === "object" &&
			cleanedValue !== null &&
			Object.keys(cleanedValue).length === 0;
		const isNullish =
			cleanedValue === null ||
			cleanedValue === undefined ||
			cleanedValue === "";

		if (!isNullish && !isEmptyObject) {
			cleanedObject[key] = cleanedValue;
		}
	}
	return cleanedObject;
};
