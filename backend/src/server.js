import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // Utility for ES Module-safe paths

// Import custom modules
import reportRoutes from "./routes/report.route.js";
import { connectDB } from "./lib/db.js";

// Load environment variables
dotenv.config();

// --- Server Setup ---
const app = express();
const PORT = process.env.PORT || 5001;
const API_PREFIX = "/api";

// Create ES Module-safe path variables
const __filename = fileURLToPath(import.meta.url);
const DIRNAME = path.dirname(__filename);

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
// Mount report routes under /api/reports
app.use(`${API_PREFIX}/reports`, reportRoutes);

// --- Production Deployment Setup (Single-Port Hosting) ---
if (process.env.NODE_ENV === "production") {
	// Path calculation to find the built React files (frontend/dist)
	const frontendBuildPath = path.join(
		DIRNAME,
		"..",
		"..",
		"frontend",
		"dist"
	);

	// 1. Serve static frontend assets
	app.use(express.static(frontendBuildPath));

	// 2. Client-side routing fallback: send index.html for all non-API GET requests
	app.get(/(.*)/, (req, res) => {
		if (!req.originalUrl.startsWith(API_PREFIX)) {
			res.sendFile(path.resolve(frontendBuildPath, "index.html"));
		} else {
			// 404 for unmatched API routes
			res.status(404).json({ message: "API endpoint not found" });
		}
	});
} else {
	// Development Health Check
	app.get("/", (req, res) => {
		res.send("Credit Report API is running.");
	});
}

// --- Start Server and Connect DB ---
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	connectDB();
});
