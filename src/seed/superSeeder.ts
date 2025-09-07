import dotenv from "dotenv";

import EmailSeeder from "@/seed/email/emailSeed";
import EmailTemplateSeeder from "@/seed/emailTemplate/emailTemplateSeed";

// Load environment variables
dotenv.config();

/**
 * SuperSeeder - Main seeder orchestrator
 *
 * This class manages all individual seeders and runs them in the correct order.
 * It serves as the central entry point for seeding the database with initial data.
 */
export default class SuperSeeder {
	private emailTemplateSeeder: EmailTemplateSeeder;
	private emailSeeder: EmailSeeder;

	constructor() {
		this.emailTemplateSeeder = new EmailTemplateSeeder();
		this.emailSeeder = new EmailSeeder();
	}

	/**
	 * Run all seeders in the correct order
	 */
	async runAll(): Promise<void> {
		console.log("🚀 Starting SuperSeeder...");
		console.log("=" + "=".repeat(50) + "=");

		const startTime = Date.now();

		try {
			// Seed email configurations first (as they might be needed by email services)
			await this.emailSeeder.run();

			// Seed email templates (as they might be needed by user notifications)
			await this.emailTemplateSeeder.run();

			// Add other seeders here in the future
			// Example:
			// await this.projectSeeder.run();

			const endTime = Date.now();
			const duration = (endTime - startTime) / 1000;

			console.log("=" + "=".repeat(50) + "=");
			console.log(`✅ SuperSeeder completed successfully in ${duration}s`);
			console.log("🎉 Database seeding finished!");
		} catch (error) {
			console.error("❌ SuperSeeder failed:", error);
			throw error;
		}
	}

	/**
	 * Run only email configuration seeder
	 */
	async runEmailSeeder(): Promise<void> {
		console.log("🚀 Running Email Configuration Seeder only...");
		try {
			await this.emailSeeder.run();
			console.log("✅ Email Configuration Seeder completed successfully!");
		} catch (error) {
			console.error("❌ Email Configuration Seeder failed:", error);
			throw error;
		}
	}

	/**
	 * Run only email template seeder
	 */
	async runEmailTemplateSeeder(): Promise<void> {
		console.log("🚀 Running Email Template Seeder only...");
		try {
			await this.emailTemplateSeeder.run();
			console.log("✅ Email Template Seeder completed successfully!");
		} catch (error) {
			console.error("❌ Email Template Seeder failed:", error);
			throw error;
		}
	}

	/**
	 * Clear all seeded data (for development/testing)
	 */
	async clearAll(): Promise<void> {
		console.log("🧹 Clearing all seeded data...");
		try {
			await this.emailTemplateSeeder.clearEmailTemplates();
			await this.emailSeeder.clearEmailConfigurations();
			console.log("✅ All seeded data cleared successfully!");
		} catch (error) {
			console.error("❌ Failed to clear seeded data:", error);
			throw error;
		}
	}
}

/**
 * CLI execution
 * This allows the seeder to be run directly from the command line
 */
if (require.main === module) {
	const superSeeder = new SuperSeeder();

	const args = process.argv.slice(2);
	const command = args[0] || "all";

	const runSeeder = async () => {
		try {
			switch (command.toLowerCase()) {
				case "all":
				case "run":
					await superSeeder.runAll();
					break;
				case "emailconfigs":
				case "emailconfig":
				case "email-configs":
				case "email-config":
					await superSeeder.runEmailSeeder();
					break;
				case "emails":
				case "email":
				case "templates":
					await superSeeder.runEmailTemplateSeeder();
					break;
				case "clear":
					await superSeeder.clearAll();
					break;
				default:
					console.log("Usage: npm run db:seed [all|users|emailconfigs|emails|clear]");
					console.log("  all (default) - Run all seeders");
					console.log("  users         - Run only user seeder");
					console.log("  emailconfigs  - Run only email configuration seeder");
					console.log("  emails        - Run only email template seeder");
					console.log("  clear         - Clear all seeded data");
					break;
			}
			process.exit(0);
		} catch (error) {
			console.error("Seeder execution failed:", error);
			process.exit(1);
		}
	};

	runSeeder();
}
