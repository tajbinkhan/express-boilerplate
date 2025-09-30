import pc from "picocolors";
import { z } from "zod";

import { validateEnum, validateEnvNumber, validateString } from "@/validators/commonRules";

const smtpEnvSchema = z.object({
	SMTP_HOST: validateString("SMTP_HOST"),
	SMTP_PORT: validateEnvNumber("SMTP_PORT", { min: 1, max: 65535, int: true }),
	SMTP_USER: validateString("SMTP_USER"),
	SMTP_PASSWORD: validateString("SMTP_PASSWORD")
});

export const cookieSchema = z.object({
	COOKIE_DOMAIN: validateString("COOKIE_DOMAIN")
});

export const envSchema = z.object({
	DATABASE_URL: validateString("DATABASE_URL"),
	PORT: validateEnvNumber("PORT", { min: 1, int: true }),
	SECRET: validateString("SECRET"),
	NODE_ENV: validateEnum("NODE_ENV", ["development", "production"]),
	ORIGIN_URL: validateString("ORIGIN_URL"),
	API_URL: validateString("API_URL"),
	...cookieSchema.shape,
	...smtpEnvSchema.shape
});

const Env = envSchema.safeParse(process.env);

if (!Env.success) {
	const errorMessages = Env.error.issues.map(e => e.message).join("\n");
	console.error(pc.red(`Environment validation failed:\n${errorMessages}`));
	process.exit(1);
}

export type EnvType = z.infer<typeof envSchema>;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends EnvType {}
	}
}
