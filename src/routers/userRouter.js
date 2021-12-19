import express from "express";
import {
  Seeuser,
  Logout,
  Edituser,
  DeleteUser,
} from "../controllers/usercontroller";

const userRouter = express.Router();

userRouter.get("/:id", Seeuser);
userRouter.get("/logout", Logout);
userRouter.get("/edit", Edituser);
userRouter.get("/delete", DeleteUser);

export default userRouter;
