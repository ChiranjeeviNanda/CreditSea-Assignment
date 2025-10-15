import React from "react";
import { Users, Landmark, Lock, Search, BarChart2 } from "lucide-react";

import SummaryCard from "./common/SummaryCard";
import { processPortfolioSummaryData } from "../utils/reportUtils";

// Configuration for Card Colors
const CARD_COLORS = {
	accounts: { icon: "text-primary", bg: "bg-primary/10" },
	balance: { icon: "text-warning", bg: "bg-warning/10" },
	secured: { icon: "text-secondary", bg: "bg-secondary/10" },
	enquiries: { icon: "text-info", bg: "bg-info/10" },
};

/**
 * Displays a high-level summary of the consumer's credit portfolio,
 * including account counts, total balance, and enquiries.
 */
const PortfolioSummary = ({ data }) => {
	// Logic extracted into utility function
	const {
		credit,
		balance,
		last7DaysCaps,
		securedDetail1,
		securedDetail2,
		enquiriesDetail1,
		enquiriesDetail2,
	} = processPortfolioSummaryData(data);

	return (
		<div className="card bg-base-200 shadow-xl border border-base-content/10 mb-6 p-6">
			<h2 className="text-3xl font-bold text-base-content border-b border-base-content/20 pb-4 mb-6 flex items-center">
				<BarChart2 className="w-8 h-8 mr-3 text-primary" />
				Portfolio Summary
			</h2>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
				{/* COLUMN 1: Main Metrics (Accounts and Balance) */}
				<div className="space-y-6">
					{/* 1. Total Accounts */}
					<SummaryCard
						title="Total Accounts"
						value={credit.CreditAccountTotal}
						detail1={`Active: ${credit.CreditAccountActive || 0}`}
						detail2={`Closed: ${credit.CreditAccountClosed || 0}`}
						IconComponent={Users}
						colorConfig={CARD_COLORS.accounts}
					/>

					{/* 2. Total Outstanding Balance */}
					<SummaryCard
						title="Total Outstanding Balance"
						value={balance.Outstanding_Balance_All}
						detail1={null}
						detail2={null}
						IconComponent={Landmark}
						colorConfig={CARD_COLORS.balance}
					/>
				</div>

				{/* COLUMN 2: Breakdown Metrics (Secured/Unsecured and Enquiries) */}
				<div className="space-y-6">
					{/* 3. Secured vs. Unsecured Balance */}
					<SummaryCard
						title="Secured vs. Unsecured"
						value={null} // Breakdown cards have no single main value
						detail1={securedDetail1}
						detail2={securedDetail2}
						IconComponent={Lock}
						colorConfig={CARD_COLORS.secured}
						isStacked={true}
					/>

					{/* 4. Enquiries (Last 7 Days) */}
					<SummaryCard
						title="Enquiries (Last 7 Days)"
						value={last7DaysCaps}
						detail1={enquiriesDetail1}
						detail2={enquiriesDetail2}
						IconComponent={Search}
						colorConfig={CARD_COLORS.enquiries}
						isStacked={true}
					/>
				</div>
			</div>
		</div>
	);
};

export default PortfolioSummary;
