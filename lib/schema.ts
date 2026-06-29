import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
  referralSource: varchar("referral_source", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
