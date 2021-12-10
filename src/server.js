import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";
const PORT = 4001;

const app = express(); //어플만들기, express함수 호출하면 express application사용가능하게 return해준다.
const logger = morgan("dev");
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
//morgan import
app.use(logger);

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () => console.log(`Server listening on port ${PORT}`);

app.listen(PORT, handleListening); //listen시작, 4000port만 listening중
//서버는 아 포트를 통해서 브라우저와 통신한다.
//이 포트로 유저가 브라우저를 통해 특정 route에 대한 request를 보낸다.
//이 request는 get http request인데, 브라우저가 서버에게 특정 route에 대한 페이지를 request한다.
