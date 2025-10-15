/**
 * Defines API routes for credit report operations (upload and retrieval).
 */
import express from "express";
import multer from "multer";
import {
	uploadAndProcessReport,
	getReportById,
} from "../controllers/report.controller.js";

const router = express.Router();

// Multer configured to store the uploaded file in memory (Buffer).
const upload = multer({ storage: multer.memoryStorage() });

// POST /upload: Uploads the XML file ('xmlFile') and processes it.
router.post("/upload", upload.single("xmlFile"), uploadAndProcessReport);

// GET /:id: Retrieves a single report document by its MongoDB ID.
router.get("/:id", getReportById);

export default router;
