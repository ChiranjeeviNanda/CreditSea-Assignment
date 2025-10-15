// src/config/scoreConfig.js

/**
 * Defines the credit score ranges and boundaries for the gauge visualization.
 */
export const SCORE_RANGES = {
	min: 300,
	max: 900,
	poor: 600, // Below 600 is Poor
	fair: 700, // 600-699 is Fair
	good: 750, // 700-749 is Good
	excellent: 900, // 750+ is Excellent
};

/**
 * Defines the segments for the react-gauge-component arc based on SCORE_RANGES.
 */
export const SEGMENTS = [
	{ limit: SCORE_RANGES.poor, color: "#ff5861" }, // Error/Red
	{ limit: SCORE_RANGES.fair, color: "#ffc400" }, // Warning/Yellow
	{ limit: SCORE_RANGES.good, color: "#00b8ff" }, // Info/Blue
	{ limit: SCORE_RANGES.excellent, color: "#5BE12C" }, // Success/Green
];
