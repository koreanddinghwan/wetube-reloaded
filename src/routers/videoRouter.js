import express from "express";
import {
  Getuploadvideo,
  Postuploadvideo,
  Watchvideo,
  Geteditvideo,
  Posteditvideo,
  Deletevideo,
} from "../controllers/videocontroller.js";

const videoRouter = express.Router();

videoRouter.route("/upload").get(Getuploadvideo).post(Postuploadvideo);
videoRouter.get("/:id([0-9a-f]{24})", Watchvideo);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .get(Geteditvideo)
  .post(Posteditvideo);
videoRouter.get("/:id([0-9a-f]{24})/delete", Deletevideo);

export default videoRouter;
