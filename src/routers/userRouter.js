import express from "express";
import {
  DeleteUser,
  EditUser,
  See,
  Logout,
} from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/logout", Logout);
userRouter.get("/edit", EditUser);
userRouter.get("/delete", DeleteUser);
userRouter.get("/:id(\\d+)", See);

export default userRouter;
