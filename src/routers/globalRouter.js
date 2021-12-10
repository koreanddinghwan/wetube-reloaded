import express from "express";
import { trending as Home, Search } from "../controllers/videoControllers";
import { Join, Login } from "../controllers/userControllers";

const globalRouter = express.Router();

globalRouter.get("/", Home);
globalRouter.get("/join", Join);
globalRouter.get("/login", Login);
globalRouter.get("/search", Search);
export default globalRouter;
