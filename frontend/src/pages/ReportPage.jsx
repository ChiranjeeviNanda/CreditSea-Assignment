import React from "react";
import { Link } from "react-router";
import { Upload, Sun, Moon } from "lucide-react";

// Custom hooks for state and global context
import { useReport } from "../hooks/useReport";
import { useTheme } from "../contexts/ThemeContext";

// Import all required components
import ConsumerOverview from "../components/ConsumerOverview";
import PortfolioSummary from "../components/PortfolioSummary";
import CreditAccountsOverview from "../components/CreditAccountsOverview";
import ExtendedReportDetails from "../components/ExtendedReportDetails";

/**
 * ReportPage component displays the comprehensive credit report data.
 * All data fetching and theme management are delegated to custom hooks.
 */
const ReportPage = () => {
	// 1. Logic Delegation: Get report data from custom hook
	const { report, loading, error } = useReport();

	// 2. Logic Delegation: Get theme state and toggle from context hook
	const { theme, toggleTheme } = useTheme();

	// --- Loading, Error, and Not Found States ---
	if (loading)
		return (
			<div className="text-center mt-20">
				<span className="loading loading-spinner loading-lg text-primary"></span>
				<p className="mt-3">Loading Report...</p>
			</div>
		);
	if (error)
		return (
			<div className="alert alert-error mt-10 max-w-3xl mx-auto">
				{error}
			</div>
		);
	if (!report)
		return (
			<div className="alert alert-info mt-10 max-w-3xl mx-auto">
				No report data found.
			</div>
		);
	// ---------------------------------------------

	// --- Data Preparation (Only what's required for this component) ---
	const {
		basic_details = {},
		report_summary = {},
		caps_summary,
		total_caps_summary,
		credit_accounts,
		current_application_details,
		report_metadata,
		upload_date,
		_id,
	} = report;

	// Consolidate basic details for the ConsumerOverview component
	const consolidatedBasicDetails = {
		name: basic_details.name || "N/A",
		mobile_phone: basic_details.mobile_phone,
		pan: basic_details.pan,
		credit_score: basic_details.credit_score,
		...basic_details,
	};

	// Consolidate CAPS data
	const consolidatedCaps = {
		Total_CAPS_Summary: total_caps_summary,
		CAPS_Summary: caps_summary,
	};
	// ------------------------------------------------------------------

	return (
		<div className="min-h-screen w-full">
			{/* Navbar for navigation and global theme toggle */}
			<div className="navbar sticky top-0 z-50 bg-base-200 shadow-xl border border-base-content/10 rounded-xl px-4 md:px-8 min-h-16">
				<div className="flex-1 min-w-0">
					<Link
						className="text-lg md:text-xl font-bold text-base-content whitespace-nowrap overflow-hidden text-ellipsis mr-2"
						to="/"
					>
						Credit Report Viewer
					</Link>
				</div>

				<div className="flex-none space-x-2">
					{/* Theme Toggle Button using context hook */}
					<button
						className="btn btn-ghost btn-sm md:btn-md"
						onClick={toggleTheme}
						aria-label="Toggle theme"
					>
						{theme === "light" ? (
							<Sun className="size-5 md:size-6" />
						) : (
							<Moon className="size-5 md:size-6" />
						)}
					</button>

					{/* Upload New Report Button */}
					<Link to="/" className="btn btn-primary btn-sm md:btn-md">
						<Upload className="size-5 md:size-6" />
						<span className="hidden md:inline">
							Upload New Report
						</span>
					</Link>
				</div>
			</div>

			<div className="my-0 md:my-10 max-w-7xl mx-auto">
				<div className="px-4 md:px-8">
					{/* Report Header/Title Section */}
					<div className="text-center py-10 bg-base-100 mt-6">
						<h1 className="text-5xl font-extrabold text-base-content tracking-tight mb-2">
							Consumer Credit Report
						</h1>
						<div className="flex flex-col sm:flex-row justify-center items-center space-x-4 text-md text-base-content/50">
							<p>
								Report ID:{" "}
								<span className="font-mono text-sm bg-base-content/10 px-2 py-0.5 rounded">
									{_id}
								</span>
							</p>
							<p className="hidden sm:block">|</p>
							<p>
								Generated:{" "}
								<span className="font-semibold">
									{upload_date
										? new Date(
												upload_date
										  ).toLocaleDateString("en-US", {
												year: "numeric",
												month: "short",
												day: "numeric",
										  })
										: "N/A"}
								</span>
							</p>
						</div>
					</div>
					{/* End Report Header */}

					<div className="grid grid-cols-1 gap-8 mt-10">
						{/* 1. Core Sections: Basic Details & Summary */}
						<ConsumerOverview data={consolidatedBasicDetails} />

						<PortfolioSummary
							data={{
								credit_account: report_summary.credit_account,
								total_outstanding_balance:
									report_summary.total_outstanding_balance,
							}}
						/>

						{/* 2. Core Sections: Accounts Table */}
						<CreditAccountsOverview accounts={credit_accounts} />

						{/* 3. Deep Dive Sections */}
						<ExtendedReportDetails
							applicationDetails={current_application_details}
							reportMetadata={report_metadata}
							consolidatedCaps={consolidatedCaps}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ReportPage;
