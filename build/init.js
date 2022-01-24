"use strict";

require("regenerator-runtime");

require("./db.js");

require("./models/Videos.js");

require("./models/User.js");

require("./models/Comment.js");

var _server = _interopRequireDefault(require("./server.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//init에서 삽입
var PORT = 4000;

_server["default"].listen(PORT, function () {
  console.log("listening");
});