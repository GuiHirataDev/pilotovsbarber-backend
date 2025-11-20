import { sql } from "../database.js";

function gerarSlots() {
  const slots = [];
  let hour = 9;
  let minute = 0;

  while (hour < 18) {
    slots.push(
      `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`
    );
    minute += 30;
    if (minute === 60) {
      minute = 0;
      hour++;
    }
  }
  return slots;
}

export async function listarHorarios(date) {
  const rows = await sql`
    SELECT horario FROM agendamentos WHERE data = ${date};
  `;

  const ocupados = rows.map((r) => r.horario);
  const todos = gerarSlots();
  return todos.filter((h) => !ocupados.includes(h));
}
