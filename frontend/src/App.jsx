import { Routes, Route, Link } from "react-router";
import UploadPage from "./pages/UploadPage.jsx";
import ReportPage from "./pages/ReportPage.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

const App = () => {
	return (
		<ThemeProvider>
			<div className="container mx-auto p-4 min-h-screen">
				<Routes>
					<Route path="/" element={<UploadPage />} />
					<Route path="/report/:id" element={<ReportPage />} />
				</Routes>
			</div>
		</ThemeProvider>
	);
};

export default App;
