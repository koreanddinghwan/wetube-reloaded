"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _usercontroller = require("../controllers/usercontroller.js");

var _videocontroller = require("../controllers/videocontroller.js");

var _middlewares = require("../middlewares.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var rootRouter = _express["default"].Router();

rootRouter.get("/", _videocontroller.Home);
rootRouter.route("/join").all(_middlewares.publicOnlyMiddleware).get(_usercontroller.getJoin).post(_usercontroller.postJoin); //get,post로 전송

rootRouter.route("/login").all(_middlewares.publicOnlyMiddleware).get(_usercontroller.getLogin).post(_usercontroller.postLogin);
rootRouter.get("/search", _videocontroller.Search);
var _default = rootRouter;
exports["default"] = _default;