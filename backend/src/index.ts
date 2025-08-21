import express from "express";
import http from "http";
import cors from "cors";
import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.get("/health", (_req, res) => res.json({ ok: true }));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    // for now: echo “ping” -> “pong” and broadcast others
    try {
      const msg = data.toString();
      if (msg === "ping") { ws.send("pong"); return; }
      // naive broadcast (we’ll add rooms later)
      wss.clients.forEach((client: any) => {
        if (client !== ws && client.readyState === 1) client.send(msg);
      });
    } catch (e) { console.error(e); }
  });
});

server.listen(PORT, () => console.log(`Signaling on :${PORT}`));

