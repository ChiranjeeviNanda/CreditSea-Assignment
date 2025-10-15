import React from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { useFileUpload } from "../hooks/useFileUpload";

/**
 * UploadPage component provides the UI for file selection and submission.
 * All state and logic are handled by the useFileUpload hook.
 */
const UploadPage = () => {
	// Connect to the custom hook
	const { selectedFile, loading, message, handleFileChange, handleUpload } =
		useFileUpload();

	const handleSubmit = (event) => {
		event.preventDefault();
		handleUpload();
	};

	const handleFileInputChange = (event) => {
		handleFileChange(event.target.files[0]);
	};

	const isSuccess = message.includes("Success");
	const displayMessage = message && !loading;

	return (
		<div className="hero min-h-screen bg-base-100" data-theme="light">
			<div className="hero-content flex-col lg:flex-row max-w-5xl w-full p-8 lg:p-12">
				{/* Left Section: Title and Description */}
				<div className="text-center lg:text-left lg:pr-12 lg:w-1/2 mb-8 lg:mb-0">
					<h1 className="text-5xl font-extrabold text-primary mb-4">
						Consumer Credit Report
					</h1>
					<p className="py-6 text-lg text-base-content/80">
						This application is designed to ingest and process
						Experian XML files. Upload an XML file to extract credit
						details like basic personal information, account
						summaries, and specific credit accounts.
					</p>
				</div>

				{/* Right Section: Upload Form */}
				<div className="card bg-base-200 shadow-xl border border-base-content/10 max-w-md">
					<form onSubmit={handleSubmit} className="card-body">
						<h2 className="text-2xl font-bold mb-4 text-center">
							Upload XML File
						</h2>

						<div className="form-control mb-5">
							<label htmlFor="xmlFile" className="label">
								<span className="label-text font-medium mb-1">
									Select Experian XML File (.xml only)
								</span>
							</label>
							<input
								type="file"
								id="xmlFile"
								accept=".xml"
								onChange={handleFileInputChange}
								className="file-input file-input-bordered file-input-primary w-full"
							/>
						</div>

						<div className="form-control">
							<button
								type="submit"
								className="btn btn-primary w-full"
								disabled={loading || !selectedFile}
							>
								{loading
									? "Processing..."
									: "Upload & Generate Report"}
								{loading && (
									<span className="loading loading-spinner ml-2"></span>
								)}
							</button>
						</div>

						{displayMessage && (
							<div
								className={`alert ${
									isSuccess ? "alert-success" : "alert-error"
								} shadow-lg mt-4`}
							>
								<div>
									{isSuccess ? (
										<CheckCircle className="stroke-current flex-shrink-0 h-6 w-6" />
									) : (
										<XCircle className="stroke-current flex-shrink-0 h-6 w-6" />
									)}
									<span>{message}</span>
								</div>
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
	);
};

export default UploadPage;
