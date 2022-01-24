"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//스키마설정
var videoSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10
  },
  creationAt: {
    type: Date,
    "default": Date.now(),
    required: true
  },
  hashtags: [{
    type: String,
    trim: true
  }],
  thumbUrl: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  },
  meta: {
    views: {
      type: Number,
      "default": 0,
      required: true
    },
    rating: {
      type: Number,
      "default": 0,
      required: true
    }
  },
  owner: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "Comment",
    "default": []
  }]
}); //데이터 전처리함수

videoSchema["static"]("formatHashtags", function (hashtags) {
  return hashtags.split(",").map(function (word) {
    return word.startsWith("#") ? word : "#".concat(word);
  });
}); //스키마를 사용하는 객체생성

var Video = _mongoose["default"].model("Video", videoSchema);

var _default = Video;
exports["default"] = _default;