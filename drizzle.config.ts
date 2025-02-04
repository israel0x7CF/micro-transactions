import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: 'C:/Users/israe/OneDrive/Documents/projects/NextJs/microtransactions/src/app/db/schema/*',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_CONNECTION_STRING!,
    password: process.env.POSTGRES_PASSWORD!,
    
  },
});
