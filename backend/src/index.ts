import cors from "cors";
import express from "express";
import { achievement, achievementType, theme } from "./resources";

const api = express();
const port = process.env.PORT ?? 4000;

api.use(express.json());
api.use(cors());

api.get("/achievement", achievement.getAll);
api.get("/achievement/:achievementTypeId", achievement.getForType);
api.post("/achievement", achievement.create);
api.put("/achievement/:achievementId", achievement.gain);
api.delete("/achievement/:achievementId", achievement.remove);

api.get("/achievementType", achievementType.getAll);

api.get("/theme", theme.getAll);
api.get("/theme/active", theme.getActive)
api.post("/theme", theme.create);
api.put("/theme/:themeId", theme.setAsActive);
api.delete("/theme/:themeId", theme.remove);
api.get("/theme/:themeId/css", theme.getJsonCSS);
api.put("/theme/:themeId/css", theme.updateJsonCSS);

api.listen(port, () => console.log(`Example app listening on port ${port}`));
