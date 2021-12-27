import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
import { localsMiddleware } from "./middlewares";

const app = express();
app.use(morgan("dev"));

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views/layouts");

app.use(express.urlencoded({ extended: true }));

//세션 미들웨어 사용
app.use(
  session({
    secret: "Hello",
    resave: true,
    saveUninitialized: false,
    //session들을 mongodb에 저장하게끔한다. 그리고 세션을 db에 접속해서 받아낼 수 있따.
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/wetube" }),
  })
);

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/user", userRouter);

export default app;
