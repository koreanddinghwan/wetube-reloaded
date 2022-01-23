import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter.js";
import videoRouter from "./routers/videoRouter.js";
import userRouter from "./routers/userRouter.js";
import { localsMiddleware } from "./middlewares.js";
import "dotenv/config";
import apiRouter from "./routers/apiRouter.js";
const { COOKIE_SECRET, DB_URL } = process.env;
import flash from "express-flash";

const app = express();
app.use(morgan("dev"));

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views/layouts");
app.use((req, res, next) => {
  //ffmpeg sharedarraybuffer 에러
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use(express.urlencoded({ extended: true })); //서버가 form데이터 주고받게해주는 미들웨어

app.use(express.json()); //string을 받아서 객체로 바꿔주는 미들웨어

//세션 미들웨어 사용
app.use(
  session({
    secret: COOKIE_SECRET, //쿠키에 sign, 백엔드가 준 쿠키라는 것을 알려준다.session hijack방지
    resave: false,
    saveUninitialized: false,
    //session들을 mongodb에 저장하게끔한다. 그리고 세션을 db에 접속해서 받아낼 수 있따.
    // cookie: {
    //   //쿠키의 만료날짜를 정한다.
    //   maxAge: 20000,
    // },

    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(flash());
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/user", userRouter);
app.use("/api", apiRouter);

export default app;
