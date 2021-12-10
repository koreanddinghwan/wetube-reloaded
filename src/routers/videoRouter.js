import express from "express";
import {
  Editvideo,
  Seevideo,
  Deletevideo,
  Upload,
} from "../controllers/videoControllers";

const videoRouter = express.Router();

videoRouter.get("/upload", Upload);
videoRouter.get("/:id(\\d+)", Seevideo);
videoRouter.get("/:id(\\d+)/edit", Editvideo);
videoRouter.get("/:id(\\d+)/delete", Deletevideo);

export default videoRouter;
