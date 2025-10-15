import React from "react";
import {
	Phone,
	CreditCard,
	CheckCircle,
	Calendar,
	BarChart2,
	UserRoundIcon,
} from "lucide-react";

import DetailItem from "./common/DetailItem";
import CreditScoreDial from "./CreditScoreDial";
import { formatDate } from "../utils/dataUtils";
import { processConsumerData } from "../utils/reportUtils";

/**
 * Displays the consumer's core personal details and credit score summary.
 */
const ConsumerOverview = ({ data }) => {
	// Logic extracted into utility function
	const {
		fullName,
		mobile_phone,
		pan,
		credit_score,
		formattedDOB,
		formattedReportDate,
		confidence,
		confidenceColor,
	} = processConsumerData(data);

	return (
		<div className="card bg-base-200 shadow-xl border border-base-content/10 mb-6 p-6">
			<h2 className="text-3xl font-bold text-base-content border-b border-base-content/20 pb-4 mb-6 flex items-center">
				<UserRoundIcon className="size-8 mr-3 text-primary" />
				Consumer Overview
			</h2>

			<div className="flex flex-col lg:flex-row gap-6">
				{/* Section 1: Credit Score Dial */}
				<div className="flex-shrink-0 flex justify-center lg:w-1/4">
					<CreditScoreDial score={credit_score} />
				</div>

				{/* Section 2: Identity Details */}
				<div className="flex-grow space-y-4">
					{/* Full Name and Verification Status */}
					<div className="p-4 bg-base-100 rounded-lg border border-base-content/10 shadow-sm">
						<p className="text-2xl font-extrabold text-base-content mb-2">
							{fullName}
						</p>
						<div className="flex items-center text-sm text-success">
							<CheckCircle className="size-4 mr-2" />
							<span className="text-base-content/80 font-medium">
								Verified against Primary Identity (PAN)
							</span>
						</div>
					</div>

					{/* Primary Details Row 1: Mobile and PAN */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<DetailItem
							icon={Phone}
							title="Mobile Number"
							value={mobile_phone}
							detail="Last reported phone"
							colorClass="text-info"
						/>
						<DetailItem
							icon={CreditCard}
							title="PAN Number"
							value={pan}
							detail="Primary Identity"
							colorClass="text-warning"
						/>
					</div>

					{/* Secondary Details Row 2: DOB, Confidence, and Report Date */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<DetailItem
							icon={Calendar}
							title="Date of Birth (DOB)"
							value={formatDate(formattedDOB)}
							detail="Validated from account records"
							colorClass="text-secondary"
						/>
						<DetailItem
							icon={BarChart2}
							title="Score Confidence"
							value={confidence}
							detail="Based on reported data depth"
							colorClass={confidenceColor}
						/>
						<DetailItem
							icon={Calendar}
							title="Report Date"
							value={formatDate(formattedReportDate)}
							detail="Date report was generated"
							colorClass="text-accent"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConsumerOverview;
