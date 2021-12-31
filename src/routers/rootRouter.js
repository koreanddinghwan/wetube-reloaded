import express from "express";
import {
  getJoin,
  getLogin,
  postLogin,
  postJoin,
} from "../controllers/usercontroller.js";
import { Home, Search } from "../controllers/videocontroller.js";
import { publicOnlyMiddleware } from "../middlewares.js";

const rootRouter = express.Router();

rootRouter.get("/", Home);
rootRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin); //get,post로 전송
rootRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
rootRouter.get("/search", Search);

export default rootRouter;
