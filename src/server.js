import { listarHorarios } from "./routes/listarHorarios.js";
import { agendar } from "./routes/agendar.js";
import { applyCors } from "./middlewares/cors.js";
import { parseJson } from "./middlewares/json.js";

export default async function handler(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;
  const method = req.method;

  applyCors(res);

  // Pré-flight CORS
  if (method === "OPTIONS") {
    return res.status(200).end();
  }

  // LISTAR HORÁRIOS
  if (path === "/listar_horarios" && method === "GET") {
    const date = url.searchParams.get("date");

    if (!date) {
      return res.status(400).json({ error: "Parâmetro date obrigatório" });
    }

    try {
      const horarios = await listarHorarios(date);
      return res.status(200).json(horarios);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro interno" });
    }
  }

  // AGENDAR
  if (path === "/agendar" && method === "POST") {
    try {
      const data = await parseJson(req);
      const { nome, telefone, date, horario } = data;

      if (!nome || !date || !horario) {
        return res
          .status(400)
          .json({ error: "Campos obrigatórios: nome, date, horario" });
      }

      const result = await agendar(nome, telefone, date, horario);

      if (result.conflict) {
        return res.status(409).json({ error: result.error });
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao processar JSON" });
    }
  }

  // ROTA PADRÃO
  return res.status(200).send("API PilotovsBarber Backend");
}
