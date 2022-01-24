"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _videocontroller = require("../controllers/videocontroller.js");

var _middlewares = require("../middlewares.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var videoRouter = _express["default"].Router();

videoRouter.route("/upload").all(_middlewares.protectorMiddleware) //로그인시에만가능
.get(_videocontroller.Getuploadvideo).post(_middlewares.videoUpload.fields([{
  name: "video"
}, {
  name: "thumb"
}]), _videocontroller.Postuploadvideo);
videoRouter.get("/:id([0-9a-f]{24})", _videocontroller.Watchvideo);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(_middlewares.protectorMiddleware).get(_videocontroller.Geteditvideo).post(_videocontroller.Posteditvideo);
videoRouter.get("/:id([0-9a-f]{24})/delete", _middlewares.protectorMiddleware, _videocontroller.Deletevideo);
var _default = videoRouter;
exports["default"] = _default;