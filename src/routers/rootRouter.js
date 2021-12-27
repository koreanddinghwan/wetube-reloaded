import express from "express";
import {
  getJoin,
  getLogin,
  postLogin,
  postJoin,
} from "../controllers/usercontroller";
import { Home, Search } from "../controllers/videocontroller";

const rootRouter = express.Router();

rootRouter.get("/", Home);
rootRouter.route("/join").get(getJoin).post(postJoin); //get,post로 전송
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", Search);

export default rootRouter;
