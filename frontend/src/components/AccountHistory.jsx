import React from "react";
import { Calendar } from "lucide-react";
import { getHistoryBadge, getTooltipText } from "../utils/uiUtils";

// Constants
const monthLabels = [
	"J",
	"F",
	"M",
	"A",
	"M",
	"J",
	"J",
	"A",
	"S",
	"O",
	"N",
	"D",
];

/**
 * AccountHistory component visualizes a credit account's payment history
 * (Days Past Due - DPD) in a chronological grid format.
 * It takes raw history data, groups it by year, and renders color-coded badges
 * for each month's status.
 */
const AccountHistory = ({ history }) => {
	if (!history || history.length === 0) {
		return (
			<div className="p-3 text-center text-base-content/50 italic rounded-md bg-base-300/50">
				No detailed payment history available.
			</div>
		);
	}

	// 1. Data Processing: Group History by Year and month index
	const historyByYear = history.reduce((acc, h) => {
		const year = h.year || "N/A";
		if (!acc[year]) {
			acc[year] = new Array(12).fill(null); // Initialize 12 months (Jan=0, Dec=11)
		}
		const monthIndex = parseInt(h.month, 10) - 1; // Month is 1-12, array is 0-11
		if (monthIndex >= 0 && monthIndex < 12) {
			acc[year][monthIndex] = h;
		}
		return acc;
	}, {});

	// Sort years descending (newest first)
	const sortedYears = Object.keys(historyByYear).sort((a, b) => b - a);

	// 2. Rendering
	return (
		<div className="overflow-x-auto">
			<h4 className="text-lg font-semibold mb-3 border-b border-base-content/10 pb-2 flex items-center">
				<Calendar className="size-5 mr-2 text-secondary" /> Payment
				Performance (DPD)
			</h4>

			{/* Header: Months */}
			<div className="grid grid-cols-13 gap-1 text-center font-bold text-xs sticky top-0 bg-base-200 z-10 p-1 border-b border-base-content/10">
				<div className="col-span-1">YEAR</div>
				{monthLabels.map((m) => (
					<div key={m} className="col-span-1">
						{m}
					</div>
				))}
			</div>

			{/* History Rows */}
			<div className="space-y-1 mt-2">
				{sortedYears.map((year) => (
					<div
						key={year}
						className="grid grid-cols-13 gap-1 text-center text-xs items-center"
					>
						<div className="col-span-1 font-bold text-sm text-primary py-1">
							{year}
						</div>
						{historyByYear[year].map((h, index) => (
							<div
								key={index}
								className={`col-span-1 tooltip tooltip-bottom`}
								data-tip={getTooltipText(h)}
							>
								<span
									className={`w-full h-6 flex justify-center items-center text-xs rounded-md shadow-sm ${getHistoryBadge(
										h?.days_past_due
									)}`}
								>
									{h
										? parseInt(h.days_past_due, 10) > 0
											? h.days_past_due // Display DPD number if > 0
											: "•" // Use a dot for current/on-time (0 DPD)
										: "—"}
								</span>
							</div>
						))}
					</div>
				))}
			</div>

			{/* Legend */}
			<div className="mt-4 text-xs text-base-content/80 p-2 bg-base-300/50 rounded-md">
				<p className="font-semibold mb-1">
					Legend (Days Past Due - DPD):
				</p>
				<div className="flex flex-wrap gap-x-4">
					<span className="flex items-center">
						<span className="inline-block w-3 h-3 rounded-full bg-success mr-1"></span>{" "}
						• = Current (0 DPD)
					</span>
					<span className="flex items-center">
						<span className="inline-block w-3 h-3 rounded-full bg-warning/80 mr-1"></span>{" "}
						1-30 DPD
					</span>
					<span className="flex items-center">
						<span className="inline-block w-3 h-3 rounded-full bg-error/80 mr-1"></span>{" "}
						31-90 DPD
					</span>
					<span className="flex items-center">
						<span className="inline-block w-3 h-3 rounded-full bg-red-800 mr-1"></span>{" "}
						&gt; 90 DPD
					</span>
				</div>
			</div>
		</div>
	);
};

export default AccountHistory;
