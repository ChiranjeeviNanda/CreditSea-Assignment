import React from "react";
import GaugeComponent from "react-gauge-component";

// Import configuration and utilities
import { SCORE_RANGES, SEGMENTS } from "../config/scoreConfig";
import { getDialProperties } from "../utils/scoreUtils";

/**
 * CreditScoreDial component renders a semicircle gauge visualization of the FICO score.
 * It ensures the score is clamped within the min/max range before rendering.
 */
const CreditScoreDial = ({ score }) => {
	// Ensure score is clamped between 300 and 900
	const effectiveScore = Math.min(
		Math.max(score || SCORE_RANGES.min, SCORE_RANGES.min),
		SCORE_RANGES.excellent
	);

	const { label, tailwindColor } = getDialProperties(effectiveScore);

	return (
		<div className="flex flex-col items-center w-full max-w-[400px] py-4">
			<GaugeComponent
				type="semicircle"
				value={effectiveScore}
				minValue={SCORE_RANGES.min}
				maxValue={SCORE_RANGES.excellent}
				marginInPercent={0.03}
				arc={{
					width: 0.2,
					padding: 0.005,
					cornerRadius: 8,
					subArcs: SEGMENTS.map((s) => ({
						limit: s.limit,
						color: s.color,
						tooltip: {
							text: `Score up to ${s.limit}`,
							style: {
								fill: "#333",
								fontWeight: "bold",
								textShadow: "rgba(0,0,0,0.1) 1px 1px 0px",
							},
						},
					})),
				}}
				pointer={{
					elastic: true,
					animationDelay: 500,
					animationDuration: 1500,
					type: "needle",
					width: 8,
					color: "#333",
					baseColor: "#333",
					length: 0.65,
				}}
				labels={{
					valueLabel: {
						matchColorWithArc: true,
						style: {
							fontSize: "36px",
							fill: "#333",
							fontWeight: "bold",
							textShadow: "rgba(0,0,0,0.1) 1px 1px 0px",
							// This translation pushes the number visually above the gauge center
							transform: "translateY(55px)",
						},
						formatTextValue: (value) => value.toString(),
						hide: false,
					},
					tickLabels: {
						hideMinMax: false,
						type: "outer",
					},
				}}
			/>

			{/* Score Label (e.g., "Excellent") */}
			<span className={`text-lg font-bold ${tailwindColor}`}>
				{label}
			</span>

			<p className="text-center text-md text-base-content/60 mt-4">
				Your current FICO Score based on the latest report.
			</p>
		</div>
	);
};

export default CreditScoreDial;
