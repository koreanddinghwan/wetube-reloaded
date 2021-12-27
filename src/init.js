import "./db";
import "./models/Videos"; //init에서 삽입
import "./models/User";
import app from "./server.js";

const PORT = 4000;
app.listen(PORT, () => {
  console.log("listening");
});
