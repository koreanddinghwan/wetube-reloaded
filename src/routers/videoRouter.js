import express from "express";
import {
  getEdit,
  watch,
  Deletevideo,
  Upload,
  postEdit,
} from "../controllers/videoControllers";

const videoRouter = express.Router();

videoRouter.get("/upload", Upload);
videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
videoRouter.get("/:id(\\d+)/delete", Deletevideo);

export default videoRouter;
