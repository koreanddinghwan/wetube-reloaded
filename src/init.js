import "regenerator-runtime";
import "./db.js";
import "./models/Videos.js"; //init에서 삽입
import "./models/User.js";
import "./models/Comment.js";
import app from "./server.js";

const PORT = 4000;
app.listen(PORT, () => {
  console.log("listening");
});
