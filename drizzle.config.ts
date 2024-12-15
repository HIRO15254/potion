import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: [
    "./src/server/db/schema/auth.ts",
    "./src/server/db/schema/application.ts",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["auth_*", "app_*"],
} satisfies Config;
