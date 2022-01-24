"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var commentSchema = new _mongoose["default"].Schema({
  text: {
    type: String,
    required: true
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  creationAt: {
    type: Date,
    "default": Date.now(),
    required: true
  },
  video: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "Video"
  }
});

var Comment = _mongoose["default"].model("Comment", commentSchema);

var _default = Comment;
exports["default"] = _default;