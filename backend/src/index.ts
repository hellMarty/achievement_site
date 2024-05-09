import express, { application } from "express";
import { achievement, achievementType, theme } from "./resources";
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

api.get("/theme", theme.getAll);
api.get("/theme/active", theme.getActive)
api.post("/theme", theme.create);
api.post("/theme/:themeId", theme.setAsActive);
api.delete("/theme/:themeId", theme.remove);
api.get("/theme/:themeId/css", theme.getCssFile);
api.post("/theme/:themeId/css", theme.replaceCssFile);
api.put("/theme/:themeId/css", theme.updateCssFile);

api.listen(port, () => console.log(`Example app listening on port ${port}`));
