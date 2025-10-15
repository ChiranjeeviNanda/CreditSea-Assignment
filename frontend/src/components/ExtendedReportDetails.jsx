import React from "react";
import { Expand } from "lucide-react";
import NestedDataDisplay from "./NestedDataDisplay";
import { sanitizeData } from "../utils/dataUtils";

/**
 * ExtendedReportDetails component acts as a container for displaying
 * deep-dive, nested, and raw JSON-like data from the report's auxiliary fields.
 * It primarily relies on the NestedDataDisplay component for rendering.
 */
const ExtendedReportDetails = ({
	applicationDetails,
	reportMetadata,
	consolidatedCaps,
}) => {
	// 1. Data Processing: Use the extracted utility function to ensure data immutability
	const sanitizedApplicationDetails = sanitizeData(applicationDetails);
	const sanitizedReportMetadata = sanitizeData(reportMetadata);
	const sanitizedConsolidatedCaps = sanitizeData(consolidatedCaps);

	return (
		<div className="card bg-base-200 shadow-xl border border-base-content/10 mb-6 p-6">
			<h2 className="text-3xl font-bold text-base-content border-b border-base-content/20 pb-4 mb-6 flex items-center">
				<Expand className="w-8 h-8 mr-3 text-primary" />
				Extended Report Details
			</h2>

			<div className="space-y-4">
				{/* 1. Applicant & Application Data */}
				<NestedDataDisplay
					title="Applicant & Application Data (Raw)"
					data={sanitizedApplicationDetails}
					openByDefault={false}
				/>

				{/* 2. Report Metadata & Score Details */}
				<NestedDataDisplay
					title="Report Metadata & Score Details (Raw)"
					data={sanitizedReportMetadata}
					openByDefault={false}
				/>

				{/* 3. Credit Account Portfolio Summary (CAPS) */}
				<NestedDataDisplay
					title="Credit Account Portfolio Summary (CAPS) (Raw)"
					data={sanitizedConsolidatedCaps}
					openByDefault={false}
				/>
			</div>
		</div>
	);
};

export default ExtendedReportDetails;
