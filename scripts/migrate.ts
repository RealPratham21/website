import { neon } from "@neondatabase/serverless";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

async function main() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured");
  }

  const sql = neon(databaseUrl);

  await sql`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      referral_source VARCHAR(100),
      created_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;

  console.log("contact_submissions table is ready");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
