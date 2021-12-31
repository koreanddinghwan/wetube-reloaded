import express from "express";
import {
  Getuploadvideo,
  Postuploadvideo,
  Watchvideo,
  Geteditvideo,
  Posteditvideo,
  Deletevideo,
} from "../controllers/videocontroller.js";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares.js";

const videoRouter = express.Router();

videoRouter.route("/upload").get(Getuploadvideo).post(Postuploadvideo);
videoRouter.get("/:id([0-9a-f]{24})", Watchvideo);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(Geteditvideo)
  .post(Posteditvideo);
videoRouter.get("/:id([0-9a-f]{24})/delete", protectorMiddleware, Deletevideo);

export default videoRouter;
