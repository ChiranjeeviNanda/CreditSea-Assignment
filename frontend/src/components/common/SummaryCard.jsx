import React from "react";
import { formatCurrency } from "../../utils/dataUtils";
import { renderBoldDetail } from "../../utils/uiUtils";

/**
 * Reusable card for displaying key summary metrics (Total Accounts, Balance, etc.).
 */
const SummaryCard = ({
	title,
	value,
	detail1,
	detail2,
	IconComponent,
	colorConfig,
	isStacked = false,
}) => {
	// Safely format the main value (only currency for non-account types)
	let displayValue =
		value !== null && value !== undefined && value !== ""
			? title.includes("Accounts")
				? value
				: formatCurrency(value)
			: "N/A";

	const isMainMetric =
		!title.includes("Secured") && !title.includes("Enquiries");

	// Main content: either the large metric or a simple spacer for alignment.
	let mainValueContent;
	if (isMainMetric) {
		const valueClass =
			displayValue === "N/A"
				? "text-xl text-base-content/50"
				: "text-4xl font-extrabold text-base-content";

		mainValueContent = <p className={valueClass}>{displayValue}</p>;
	} else {
		mainValueContent = <div className="hidden"></div>;
	}

	// Detail Section: always rendered at the bottom
	const detailSection = (detail1 || detail2) && (
		<div
			className={`space-y-2 text-sm ${
				isMainMetric
					? "mt-5 pt-3 border-t border-base-content/10"
					: "mt-4"
			}`}
		>
			{renderBoldDetail(detail1)}
			{renderBoldDetail(detail2)}
		</div>
	);

	const cardHeight = isStacked ? "h-auto" : "h-full";
	const cardBodyClasses = `flex flex-col ${
		isMainMetric ? "justify-between" : "justify-start"
	} ${cardHeight}`;

	return (
		<div
			className={`p-6 rounded-lg shadow-lg ${cardBodyClasses}
                         transform transition duration-300 hover:scale-[1.02] border border-base-content/10 
                         bg-base-100 ${colorConfig.bg}`}
		>
			{/* Header: Title and Icon */}
			<div className="flex items-center justify-between mb-4 border-b border-base-content/10 pb-2">
				<h4 className="text-sm font-semibold uppercase text-base-content">
					{title}
				</h4>
				<IconComponent
					className={`size-6 opacity-90 ${colorConfig.icon}`}
				/>
			</div>

			{/* Main Value or Content */}
			{mainValueContent}

			{/* Detail Section */}
			{detailSection}
		</div>
	);
};

export default SummaryCard;
