"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _usercontroller = require("../controllers/usercontroller.js");

var _middlewares = require("../middlewares.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userRouter = _express["default"].Router();

userRouter.get("/github/start", _middlewares.publicOnlyMiddleware, _usercontroller.startGithubLogin); //깃허브 로그인시 링크

userRouter.get("/github/finish", _middlewares.publicOnlyMiddleware, _usercontroller.finishGithubLogin);
userRouter.get("/logout", _middlewares.protectorMiddleware, _usercontroller.Logout);
userRouter.route("/edit").all(_middlewares.protectorMiddleware).get(_usercontroller.getEdit).post(_middlewares.avatarUpload.single("avatar"), _usercontroller.postEdit);
userRouter.route("/change-password").all(_middlewares.protectorMiddleware).get(_usercontroller.getChangePassword).post(_usercontroller.postChangePassword);
userRouter.get("/:id", _usercontroller.seeuser);
var _default = userRouter;
exports["default"] = _default;