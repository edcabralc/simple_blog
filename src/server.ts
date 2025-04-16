import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import { mainRoutes } from "@routes/main.routes";

dotenv.config();
const PORT = process.env.PORT || "3003";

const server = express();

server.use(cors());
server.use(express.urlencoded({ limit: "50000mb", extended: true }));
server.use(express.json());
server.use(express.static(path.join(__dirname, "../public")));

server.use("/api/v1/", mainRoutes);

server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
