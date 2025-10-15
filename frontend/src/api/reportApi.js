import axios from "axios";

// The relative path is critical for single-port deployment on Render.
const API_ENDPOINT = "/api/reports/upload";

/**
 * Uploads an XML file to the backend API.
 */
export const uploadReport = async (formData) => {
	try {
		const response = await axios.post(API_ENDPOINT, formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
		// Return the reportId on successful upload
		return response.data.reportId;
	} catch (error) {
		// Throw a simplified error message for the hook to catch
		const errorMessage =
			error.response?.data?.message ||
			"An unexpected upload error occurred.";
		throw new Error(errorMessage);
	}
};

/**
 * Fetches a single credit report by its ID.
 */
export const fetchReport = async (id) => {
    const API_ENDPOINT = `/api/reports/${id}`;
    
    try {
        const response = await axios.get(API_ENDPOINT);
        return response.data;
    } catch (error) {
        // Handle common errors for the hook
        const errorMessage = error.response?.data?.message || "Could not connect to the server or report ID is invalid.";
        throw new Error(errorMessage);
    }
};
