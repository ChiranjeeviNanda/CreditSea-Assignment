import { useState, useEffect } from "react";
import { fetchReport } from "../api/reportApi";
import { useParams } from "react-router";

/**
 * Custom hook to fetch and manage state for a single credit report.
 */
export const useReport = () => {
	const { id } = useParams();
	const [report, setReport] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!id) {
			setLoading(false);
			setError("No report ID provided in the URL.");
			return;
		}

		const loadReport = async () => {
			setLoading(true);
			setError(null);
			try {
				const data = await fetchReport(id);
				setReport(data);
			} catch (err) {
				console.error("Fetch error:", err.message);
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		loadReport();
	}, [id]);

	return { report, loading, error };
};
