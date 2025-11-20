import { sql } from "../database.js";

export async function agendar(nome, telefone, date, horario) {
  const existe = await sql`
    SELECT 1 FROM agendamentos WHERE data = ${date} AND horario = ${horario};
  `;

  if (existe.length > 0) {
    return { error: "Horário já reservado", conflict: true };
  }

  await sql`
    INSERT INTO agendamentos (nome, telefone, data, horario)
    VALUES (${nome}, ${telefone}, ${date}, ${horario});
  `;

  return { success: true };
}
