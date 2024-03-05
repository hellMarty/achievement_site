import express from "express";
import { achievement } from "./resources";
import cors from "cors";

const api = express();
const port = process.env.PORT ?? 4000;

api.use(express.json());
api.use(cors());

api.get("/", achievement.get);

api.post("/achievement", achievement.create);
api.get("/achievements", achievement.getAll);

api.listen(port, () => console.log(`Example app listening on port ${port}`));
