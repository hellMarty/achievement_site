import express from "express";
import { achievement, achievementType } from "./resources";
import cors from "cors";

const api = express();
const port = process.env.PORT ?? 4000;

api.use(express.json());
api.use(cors());

api.get("/achievement", achievement.getAll);
api.get("/achievement/:achievementTypeId", achievement.getForType);
api.post("/achievement", achievement.create);
api.post("/achievement/:achievementId", achievement.gain);
api.delete("/achievement/:achievementId", achievement.remove);

api.get("/achievementType", achievementType.getAll);

api.listen(port, () => console.log(`Example app listening on port ${port}`));
