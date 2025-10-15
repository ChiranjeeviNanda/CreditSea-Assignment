// src/utils/scoreUtils.js

import { SCORE_RANGES } from "../config/scoreConfig";

/**
 * Determines the label and styling based on the provided credit score.
 * @param {number} score - The credit score value.
 * @returns {{label: string, tailwindColor: string, tailwindBg: string, arcColor: string}}
 */
export const getDialProperties = (score) => {
	if (score >= SCORE_RANGES.good) {
		return {
			label: "Excellent",
			tailwindColor: "text-success",
			tailwindBg: "bg-success/20",
			arcColor: "#5BE12C", // Success Green
		};
	}
	if (score >= SCORE_RANGES.fair) {
		return {
			label: "Good",
			tailwindColor: "text-info",
			tailwindBg: "bg-info/20",
			arcColor: "#00b8ff", // Info Blue
		};
	}
	if (score >= SCORE_RANGES.poor) {
		return {
			label: "Fair",
			tailwindColor: "text-warning",
			tailwindBg: "bg-warning/20",
			arcColor: "#ffc400", // Warning Yellow
		};
	}
	return {
		label: "Poor",
		tailwindColor: "text-error",
		tailwindBg: "bg-error/20",
		arcColor: "#ff5861", // Error Red
	};
};
