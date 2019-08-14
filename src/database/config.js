import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

/**
 * Use this pattern in naming your local connection strings
 *  postgres://{database_username}:{database_password}@{host}:{port}/{database_name}
 */

const connectionString = isProduction
  ? process.env.DATABASE_URL
  : "postgres://postgres:juninho1@127.0.0.1:5432/weTravel";

const { Pool } = pg;

const db = new Pool({ connectionString });

export default db;
