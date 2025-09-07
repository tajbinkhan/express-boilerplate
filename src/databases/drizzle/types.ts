import type { InferSelectModel } from "drizzle-orm";

import { ROLE_LIST, TOKEN_LIST } from "@/databases/drizzle/lists";
import type { email } from "@/models/drizzle/email.model";
import type { emailTemplates } from "@/models/drizzle/emailTemplate.model";

export type EmailTemplateSchemaType = InferSelectModel<typeof emailTemplates>;
export type EmailSchemaType = InferSelectModel<typeof email>;

/**
 * Enum Schema Types
 */
export type RoleType = (typeof ROLE_LIST.enumValues)[number];
export type TokenType = (typeof TOKEN_LIST.enumValues)[number];
