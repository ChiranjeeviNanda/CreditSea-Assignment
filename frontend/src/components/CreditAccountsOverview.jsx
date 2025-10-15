import React from "react";
import { CreditCard, AlertCircle } from "lucide-react";
import CreditAccountRow from "./CreditAccountRow";

/**
 * Displays a list of all credit accounts in the report, using a collapsible row
 * component for detail viewing.
 */
const CreditAccountsOverview = ({ accounts }) => {
	return (
		<div className="card bg-base-200 shadow-xl border border-base-content/10 mb-6 p-6">
			<h2 className="text-3xl font-bold text-base-content border-b border-base-content/20 pb-4 mb-6 flex items-center">
				<CreditCard className="w-8 h-8 mr-3 text-primary" />
				Credit Accounts Overview ({accounts.length})
			</h2>
			<div className="overflow-x-auto">
				<span className="flex-row items-center justify-center text-md font-semibold text-primary hidden md:flex mb-2">
					<AlertCircle className="size-5 mr-1 mt-1" />
					Click each entry for more details
				</span>
				<div className="w-full">
					{/* Iterating over accounts using the extracted component */}
					{accounts.map((acc, index) => (
						<CreditAccountRow key={index} acc={acc} />
					))}
				</div>
			</div>
		</div>
	);
};

export default CreditAccountsOverview;
