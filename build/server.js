"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _rootRouter = _interopRequireDefault(require("./routers/rootRouter.js"));

var _videoRouter = _interopRequireDefault(require("./routers/videoRouter.js"));

var _userRouter = _interopRequireDefault(require("./routers/userRouter.js"));

var _middlewares = require("./middlewares.js");

require("dotenv/config");

var _apiRouter = _interopRequireDefault(require("./routers/apiRouter.js"));

var _expressFlash = _interopRequireDefault(require("express-flash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _process$env = process.env,
    COOKIE_SECRET = _process$env.COOKIE_SECRET,
    DB_URL = _process$env.DB_URL;
var app = (0, _express["default"])();
app.use((0, _morgan["default"])("dev"));
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views/layouts");
app.use(function (req, res, next) {
  //ffmpeg sharedarraybuffer 에러
  res.header("Cross-Origin-Embedder-Policy", "require-corp");
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  next();
});
app.use(_express["default"].urlencoded({
  extended: true
})); //서버가 form데이터 주고받게해주는 미들웨어

app.use(_express["default"].json()); //string을 받아서 객체로 바꿔주는 미들웨어
//세션 미들웨어 사용

app.use((0, _expressSession["default"])({
  secret: COOKIE_SECRET,
  //쿠키에 sign, 백엔드가 준 쿠키라는 것을 알려준다.session hijack방지
  resave: false,
  saveUninitialized: false,
  //session들을 mongodb에 저장하게끔한다. 그리고 세션을 db에 접속해서 받아낼 수 있따.
  // cookie: {
  //   //쿠키의 만료날짜를 정한다.
  //   maxAge: 20000,
  // },
  store: _connectMongo["default"].create({
    mongoUrl: process.env.DB_URL
  })
}));
app.use((0, _expressFlash["default"])());
app.use(_middlewares.localsMiddleware);
app.use("/uploads", _express["default"]["static"]("uploads"));
app.use("/static", _express["default"]["static"]("assets"));
app.use("/", _rootRouter["default"]);
app.use("/videos", _videoRouter["default"]);
app.use("/user", _userRouter["default"]);
app.use("/api", _apiRouter["default"]);
var _default = app;
exports["default"] = _default;