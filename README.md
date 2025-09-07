# Express Boilerplate

An opinionated Express boilerplate built with TypeScript, Drizzle ORM, and PostgreSQL.

## Features

- TypeScript support with strict type checking
- Drizzle ORM for type-safe database interactions
- PostgreSQL integration (via `pg`)
- Environment validation using `zod`
- Structured folder conventions (controllers, services, routes, settings)
- CSRF protection and secure defaults (Helmet, rate limiter, CORS)
- Email sending with Handlebars templates
- Built-in request logging and error handling
- Seeders and migration scripts via Drizzle
- ESLint and Prettier configured for code quality

## Prerequisites

- Node.js v20 or higher
- pnpm v7 or higher (or npm/yarn)
- PostgreSQL database

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/your-org/express-boilerplate.git
   cd express-boilerplate
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create a `.env` file in the project root and configure the following variables:

   ```dotenv
   # Server settings
   PORT=8080
   NODE_ENV=development
   SECRET=your-secret-session-key
   SESSION_COOKIE_NAME=session
   ORIGIN_URL=http://localhost:3000
   API_URL=http://localhost:8080

   # Database
   DATABASE_URL=postgresql://user:password@localhost:5432/database_name

   # CSRF & Cookies
   COOKIE_SETTINGS=locally
   COOKIE_DOMAIN=localhost
   COOKIE_SAME_SITE=lax

   # Email (SMTP)
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=sender@example.com
   SMTP_PASSWORD=email-password

   # OAuth (Google)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GOOGLE_CALLBACK_URL=http://localhost:8080/auth/google/callback

   # Other
   OTP_RESET_EXPIRY=300            # seconds
   SHOW_OTP=false
   ```

4. Prepare the database schema and run migrations:

   ```bash
   pnpm run db:push       # Push schema to database
   pnpm run db:generate   # Generate migration files
   pnpm run db:migrate    # Apply migrations
   ```

5. (Optional) Seed the database:
   ```bash
   pnpm run db:seed       # Run default seeder
   pnpm run db:seed:users # Seed users only
   pnpm run db:seed:clear # Clear seeded data
   ```

## Scripts

- `pnpm run dev` — Start development server with auto-reload
- `pnpm run build` — Type-check, lint, clean `dist/`, and bundle with `tsup`
- `pnpm run start` — Run the compiled server
- `pnpm run lint` — Lint source files with ESLint
- `pnpm run format` — Format source files with Prettier
- `pnpm run type-check`— Run TypeScript compiler in noEmit mode

### Drizzle CLI

- `pnpm run db:studio` — Launch Drizzle Studio GUI
- `pnpm run db:clear` — Clean database and drop all tables
- `pnpm run db:reset` — Clear, migrate, then seed

## Project Structure

```
├── src
│   ├── app.ts               # Express application setup
│   ├── server.ts            # Entry point
│   ├── app/                 # Feature folders (email, templates, etc.)
│   ├── core/                # Constants, environment loader, messages
│   ├── databases/drizzle/   # Drizzle connection and helpers
│   ├── mailer/              # Mailer config and schema
│   ├── models/drizzle/      # Drizzle table schemas
│   ├── routes/              # API routes configuration
│   ├── settings/            # Middleware and logger setup
│   ├── utils/               # Helper functions (CSRF, sorting, domain store)
│   └── validators/          # Zod validation schemas
└── drizzle.config.ts        # DrizzleKit configuration
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
