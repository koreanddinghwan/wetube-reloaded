import express from "express";
import {
  Seeuser,
  Logout,
  getEdit,
  postEdit,
  DeleteUser,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/usercontroller.js";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares.js";

const userRouter = express.Router();

userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin); //깃허브 로그인시 링크
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);
userRouter.get("/logout", protectorMiddleware, Logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/:id", Seeuser);

export default userRouter;
