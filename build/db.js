"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

_mongoose["default"].connect(process.env.DB_URL);

var db = _mongoose["default"].connection;
db.on("error", function (error) {
  console.log(error);
});
db.once("open", function () {
  console.log("db connected");
});