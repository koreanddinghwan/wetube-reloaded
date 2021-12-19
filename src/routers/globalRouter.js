import express from "express";
import { Join, Login } from "../controllers/usercontroller";
import { Home, Search } from "../controllers/videocontroller";

const globalRouter = express.Router();

globalRouter.get("/", Home);
globalRouter.get("/join", Join);
globalRouter.get("/login", Login);
globalRouter.get("/search", Search);

export default globalRouter;
