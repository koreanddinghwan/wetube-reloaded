import express from "express";
import {
  Seeuser,
  Logout,
  Edituser,
  DeleteUser,
  startGithubLogin,
  finishGithubLogin,
} from "../controllers/usercontroller.js";

const userRouter = express.Router();

userRouter.get("/github/start", startGithubLogin); //깃허브 로그인시 링크
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get("/logout", Logout);
userRouter.get("/edit", Edituser);
userRouter.get("/delete", DeleteUser);
userRouter.get("/:id", Seeuser);

export default userRouter;
