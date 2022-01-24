"use strict";

var _regeneratorRuntime = require("regenerator-runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var videoContainer = document.getElementById("videoContainer");
var form = document.getElementById("commentForm");

var addComment = function addComment(text, newCommentId) {
  var videoComments = document.querySelector(".video__comments ul");
  var newComment = document.createElement("li");
  newComment.dataset.id = newCommentId;
  newComment.className = "video__comment";
  var icon = document.createElement("i");
  icon.classList = "fas fa-comment";
  var span = document.createElement("span");
  span.innerText = " ".concat(text);
  var span2 = document.createElement("span");
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  console.log(text);
  videoComments.prepend(newComment);
};

var handleSubmit = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(e) {
    var textarea, text, videoId, response, _yield$response$json, newCommentId;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();
            textarea = form.querySelector("textarea");
            text = textarea.value;
            videoId = videoContainer.dataset.videoid; //videocontainer의 dataset프로퍼티이용

            if (!(text === "")) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return");

          case 6:
            _context.next = 8;
            return fetch("/api/videos/".concat(videoId, "/comment"), {
              method: "POST",
              headers: {
                //request의 정보를 담는다.
                "Content-Type": "application/json" //express.json 미들웨어를 사용하게끔 express에게 알려준다.

              },
              body: JSON.stringify({
                text: text
              })
            });

          case 8:
            response = _context.sent;
            textarea.value = "";
            _context.next = 12;
            return response.json();

          case 12:
            _yield$response$json = _context.sent;
            newCommentId = _yield$response$json.newCommentId;

            if (response.status === 201) {
              console.log("create fake comment");
              addComment(text, newCommentId);
            }

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleSubmit(_x) {
    return _ref.apply(this, arguments);
  };
}();

if (form) {
  form.addEventListener("submit", handleSubmit);
}