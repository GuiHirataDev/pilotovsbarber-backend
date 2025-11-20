import { sql } from "./database.js";

export default async function handler(req, res) {
  try {
    const result = await sql`SELECT version()`;
    res.status(200).send("Conectado ao Neon! Versão: " + result[0].version);
  } catch (erro) {
    console.error("Erro ao conectar Neon:", erro);
    res.status(500).send("Erro ao conectar base de dados.");
  }
}
