import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({ connectionString: process.env.DATABASE_URL });

client.connect()
  .then(() => client.query("SELECT 1"))
  .then((res) => {
    console.log("SUCCESS:", res.rows);
    client.end();
  })
  .catch((err) => {
    console.error("FAILED:", err);
  });