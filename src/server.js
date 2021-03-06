import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const app = express();
app.use(morgan("dev"));

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views/layouts");

app.use(express.urlencoded({ extended: true }));

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/user", userRouter);

export default app;
