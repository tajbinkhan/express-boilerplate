import express, { Router } from "express";

import EmailController from "@/app/email/email.controller";

import { asyncErrorHandler } from "@/settings/errorHandler";

export const emailRouter: Router = (() => {
	const router = express.Router();

	// Get all emails
	router.get(
		"",
		asyncErrorHandler(async (req, res) => {
			await new EmailController(req, res).index();
		})
	);

	// Test SMTP connection without saving
	router.route("/test-smtp").post(
		asyncErrorHandler(async (req, res) => {
			await new EmailController(req, res).testSmtpConnection();
		})
	);

	router
		.route("/:id")
		.get(
			asyncErrorHandler(async (req, res) => {
				await new EmailController(req, res).show();
			})
		)
		.put(
			asyncErrorHandler(async (req, res) => {
				await new EmailController(req, res).update();
			})
		);

	return router;
})();
