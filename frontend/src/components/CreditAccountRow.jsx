import React from "react";
import { Scale } from "lucide-react";

import AccountHistory from "./AccountHistory";
import { formatCurrency } from "../utils/dataUtils";
import { renderBoldDetail } from "../utils/uiUtils";
import { processCreditAccount } from "../utils/reportUtils";

/**
 * Renders a single, collapsible row representing one credit account in the report.
 */
const CreditAccountRow = ({ acc }) => {
	// 1. Delegation: Process data and determine UI state/colors
	const {
		isPastDue,
		colorConfig,
		IconComponent,
		accountType,
		accountStatus,
		detailLeft1,
		detailLeft2,
		detailLeft3,
		detailLeft4,
		detailLeft5,
	} = processCreditAccount(acc);

	return (
		<div
			className={`mb-4 border border-base-300 rounded-lg shadow-md ${colorConfig.bg}`}
		>
			<details className="collapse collapse-plus">
				{/* 1. SUMMARY: Fixed 4-Column Header */}
				<summary
					className={`collapse-title p-3 cursor-pointer hover:bg-base-200/50 ${colorConfig.bg} rounded-lg`}
				>
					<div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm font-medium items-center">
						{/* Column 1: Institution & Account Details */}
						<div className="flex items-center space-x-3">
							{/* IconComponent is derived in the utility function, but imported here */}
							<IconComponent
								className={`size-6 flex-shrink-0 ${colorConfig.icon}`}
							/>
							<div>
								<div className="font-bold text-base-content">
									{acc.subscriber_name}
								</div>
								<div className="text-xs opacity-70">
									{accountType} ({acc.account_number})
								</div>
							</div>
						</div>

						{/* Column 2: Balance & Limit */}
						<div className="text-left">
							{renderBoldDetail(
								`Balance: ${formatCurrency(
									acc.current_balance
								)}`
							)}
							{renderBoldDetail(
								`Limit: ${formatCurrency(acc.credit_limit)}`
							)}
						</div>

						{/* Column 3: Past Due & Status */}
						<div className="text-left">
							<div
								className={`font-extrabold ${
									isPastDue ? "text-error" : "text-success"
								}`}
							>
								{renderBoldDetail(
									`Past Due: ${formatCurrency(
										acc.amount_past_due
									)}`
								)}
							</div>
							<span
								className={`badge badge-sm ${
									isPastDue ? "badge-error" : "badge-success"
								}`}
							>
								{accountStatus}
							</span>
						</div>
					</div>
				</summary>

				{/* 2. CONTENT: Expanded Details Section */}
				<div className="collapse-content bg-base-200/80 p-6 border-t border-base-300 rounded-b-lg">
					<div className="grid lg:grid-cols-3 gap-6">
						{/* Left Column: Key Account Details */}
						<div className="lg:col-span-1 border-r lg:pr-6 space-y-2">
							<h4 className="text-lg font-semibold mb-3 border-b border-base-content/10 pb-2 flex items-center">
								<Scale className="size-5 mr-2 text-secondary" />{" "}
								Extended Details
							</h4>
							{renderBoldDetail(detailLeft1)}
							{renderBoldDetail(detailLeft2)}
							{renderBoldDetail(detailLeft3)}
							{renderBoldDetail(detailLeft4)}
							{renderBoldDetail(detailLeft5)}
						</div>

						{/* Right Column: Account History (Full Monthly Performance) */}
						<div className="lg:col-span-2">
							<AccountHistory history={acc.history} />
						</div>
					</div>
				</div>
			</details>
		</div>
	);
};

export default CreditAccountRow;
