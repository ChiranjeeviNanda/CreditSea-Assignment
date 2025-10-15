import { useState } from "react";
import { useNavigate } from "react-router";
import { uploadReport } from "../api/reportApi";

/**
 * Custom hook to handle file selection, upload state, and API submission logic.
 */
export const useFileUpload = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");
	const navigate = useNavigate();

	const handleFileChange = (file) => {
		setSelectedFile(file);
		setMessage("");
	};

	const handleUpload = async () => {
		if (!selectedFile) {
			setMessage("Please select an XML file first.");
			return;
		}

		setLoading(true);
		setMessage("Uploading and processing file...");

		const formData = new FormData();
		formData.append("xmlFile", selectedFile);

		try {
			const reportId = await uploadReport(formData);
			setMessage("Success! Redirecting to report...");
			navigate(`/report/${reportId}`);
		} catch (error) {
			setMessage(`Upload Failed: ${error.message}`);
		} finally {
			setLoading(false);
		}
	};

	return {
		selectedFile,
		loading,
		message,
		handleFileChange,
		handleUpload,
	};
};
