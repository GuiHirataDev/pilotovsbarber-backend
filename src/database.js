import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  console.error("❌ ERRO: DATABASE_URL não configurado!");
}

export const sql = neon(process.env.DATABASE_URL);
