import express from "express";
import { achievement, achievementType } from "./resources";
import cors from "cors";

const api = express();
const port = process.env.PORT ?? 4000;

api.use(express.json());
api.use(cors());

api.post("/achievement", achievement.create);
api.get("/achievement", achievement.getAll);
api.get("/achievement/:achievementTypeId", achievement.getForType);
api.delete("/achievement/:id", achievement.remove);

api.get("/achievementType", achievementType.getAll);

api.listen(port, () => console.log(`Example app listening on port ${port}`));
