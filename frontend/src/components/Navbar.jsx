import React from "react";
import { Link } from "react-router";
import { Upload, Sun, Moon } from "lucide-react";

// Import the custom consumer hook from the Context file
import { useTheme } from "../context/ThemeContext";

/**
 * Navbar component for navigation, report identification display, and theme switching.
 * It uses the useTheme hook to access the global theme state and toggle function.
 */
const Navbar = ({ consumerName, creditScore }) => {
	// 1. Theme Logic: Access state and toggle function from global context
	const { theme, toggleTheme } = useTheme();

	return (
		<div className="navbar sticky top-0 z-50 bg-base-200 shadow-xl border-b border-base-content/10 rounded-xl px-4 md:px-8">
			{/* ... (rest of the component JSX remains the same) ... */}
			<div className="flex-1">
				<Link
					className="text-xl font-bold text-base-content mr-4"
					to="/"
				>
					Credit Report
				</Link>

				{/* Report Identifier Quick View */}
				{consumerName && (
					<div className="hidden sm:flex items-center space-x-3 text-sm font-medium text-base-content/70 border-l ml-3 pl-3">
						<span>
							Report for:{" "}
							<span className="font-semibold text-base-content">
								{consumerName}
							</span>
						</span>
						{creditScore && (
							<span className="badge badge-lg badge-accent text-base-content font-bold">
								Score: {creditScore}
							</span>
						)}
					</div>
				)}
			</div>

			<div className="flex-none space-x-2">
				{/* Theme Toggle Button */}
				<button
					className="btn btn-ghost btn-circle"
					onClick={toggleTheme}
					aria-label={`Switch to ${
						theme === "light" ? "dark" : "light"
					} theme`}
				>
					{theme === "light" ? (
						<Moon className="size-6" />
					) : (
						<Sun className="size-6" />
					)}
				</button>

				{/* Upload New Report Button */}
				<Link to="/" className="btn btn-primary">
					<Upload className="size-5" />
					<span className="hidden sm:inline">Upload New</span>
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
