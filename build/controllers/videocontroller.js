"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerView = exports.createComment = exports.Watchvideo = exports.Search = exports.Postuploadvideo = exports.Posteditvideo = exports.Home = exports.Getuploadvideo = exports.Geteditvideo = exports.Deletevideo = void 0;

var _Videos = _interopRequireDefault(require("../models/Videos.js"));

var _Comment = _interopRequireDefault(require("../models/Comment.js"));

var _User = _interopRequireDefault(require("../models/User.js"));

var _expressFlash = _interopRequireDefault(require("express-flash"));

var _regeneratorRuntime = require("regenerator-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var videos, _videos;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            videos = [];
            _context.prev = 1;
            _context.next = 4;
            return _Videos["default"].find({}).sort({
              creationAt: "desc"
            }).populate("owner");

          case 4:
            _videos = _context.sent;
            console.log(_videos);
            return _context.abrupt("return", res.render("home", {
              pageTitle: "Home",
              videos: _videos
            }));

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", res.render("home", {
              pageTitle: "Home",
              videos: videos
            }));

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 9]]);
  }));

  return function Home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.Home = Home;

var Watchvideo = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id;
            _context2.prev = 1;
            _context2.next = 4;
            return _Videos["default"].findById(id).populate("owner").populate("comments");

          case 4:
            video = _context2.sent;
            res.render("Watchvideo", {
              pageTitle: "Watch",
              video: video
            });
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", res.status(404).render("404", {
              pageTitle: "404"
            }));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));

  return function Watchvideo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.Watchvideo = Watchvideo;

var Getuploadvideo = function Getuploadvideo(req, res) {
  return res.render("upload", {
    pageTitle: "upload"
  });
};

exports.Getuploadvideo = Getuploadvideo;

var Postuploadvideo = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$files, video, thumb, _id, _req$body, title, description, hashtags, newVideo, user;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _req$files = req.files, video = _req$files.video, thumb = _req$files.thumb;
            _id = req.session.user._id;
            _req$body = req.body, title = _req$body.title, description = _req$body.description, hashtags = _req$body.hashtags;
            _context3.prev = 3;
            _context3.next = 6;
            return _Videos["default"].create({
              title: title,
              description: description,
              fileUrl: video[0].path,
              thumbUrl: thumb[0].path,
              owner: _id,
              hashtags: _Videos["default"].formatHashtags(hashtags)
            });

          case 6:
            newVideo = _context3.sent;
            _context3.next = 9;
            return _User["default"].findById(_id);

          case 9:
            user = _context3.sent;
            user.videos.push(newVideo._id);
            user.save();
            return _context3.abrupt("return", res.redirect("/"));

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](3);
            return _context3.abrupt("return", res.status(400).render("upload", {
              pageTitle: "upload",
              errormessage: _context3.t0._message
            }));

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3, 15]]);
  }));

  return function Postuploadvideo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.Postuploadvideo = Postuploadvideo;

var Geteditvideo = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, _id, video;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _id = req.session.user._id;
            _context4.next = 4;
            return _Videos["default"].findById(id);

          case 4:
            video = _context4.sent;

            if (video) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(404).render("404", {
              pageTitle: "Video not found"
            }));

          case 7:
            if (!(String(video.owner) !== String(_id))) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(403).redirect("/"));

          case 9:
            return _context4.abrupt("return", res.render("edit", {
              pageTitle: "Edit",
              video: video
            }));

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function Geteditvideo(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.Geteditvideo = Geteditvideo;

var Posteditvideo = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, _id, _req$body2, title, description, hashtags, video;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _id = req.session.user._id;
            _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description, hashtags = _req$body2.hashtags;
            video = _Videos["default"].exists({
              _id: id
            });

            if (video) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.render("404"));

          case 6:
            if (!(String(video.owner) !== String(_id))) {
              _context5.next = 8;
              break;
            }

            return _context5.abrupt("return", res.status(403).redirect("/"));

          case 8:
            _context5.next = 10;
            return _Videos["default"].findByIdAndUpdate(id, {
              title: title,
              description: description,
              hashtags: _Videos["default"].formatHashtags(hashtags)
            });

          case 10:
            return _context5.abrupt("return", res.redirect("/videos/" + "".concat(id)));

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function Posteditvideo(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.Posteditvideo = Posteditvideo;

var Deletevideo = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, _id, video;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _id = req.session.user._id;
            _context6.next = 4;
            return _Videos["default"].findById(id);

          case 4:
            video = _context6.sent;

            if (video) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return", res.status(404).render("404", {
              pageTitle: "Video not found"
            }));

          case 7:
            if (!(String(video.owner) !== String(_id))) {
              _context6.next = 10;
              break;
            }

            req.flash("error", "권한이 없습니다");
            return _context6.abrupt("return", res.status(403).redirect("/"));

          case 10:
            _context6.next = 12;
            return _Videos["default"].deleteOne({
              id: id
            });

          case 12:
            res.redirect("/");

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function Deletevideo(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.Deletevideo = Deletevideo;

var Search = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var videos, keyword;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            videos = [];
            keyword = req.query.keyword;

            if (keyword) {
              _context7.next = 4;
              break;
            }

            return _context7.abrupt("return", res.render("Search", {
              pageTitle: "Search",
              videos: videos
            }));

          case 4:
            _context7.next = 6;
            return _Videos["default"].find({
              title: {
                $regex: new RegExp("".concat(keyword, "$"), "i")
              }
            }).populate("owner");

          case 6:
            videos = _context7.sent;
            res.render("Search", {
              pageTitle: "Search",
              videos: videos
            });

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function Search(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

exports.Search = Search;

var registerView = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            _context8.next = 3;
            return _Videos["default"].findById(id);

          case 3:
            video = _context8.sent;

            if (video) {
              _context8.next = 6;
              break;
            }

            return _context8.abrupt("return", res.sendStatus(404));

          case 6:
            video.meta.views += 1;
            _context8.next = 9;
            return video.save();

          case 9:
            return _context8.abrupt("return", res.sendStatus(200));

          case 10:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function registerView(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();

exports.registerView = registerView;

var createComment = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var text, id, user, video, comment;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            text = req.body.text, id = req.params.id, user = req.session.user;
            console.log(text);
            console.log(id);
            console.log(user);
            _context9.next = 6;
            return _Videos["default"].findById(id);

          case 6:
            video = _context9.sent;

            if (video) {
              _context9.next = 9;
              break;
            }

            return _context9.abrupt("return", res.sendStatus(404));

          case 9:
            _context9.next = 11;
            return _Comment["default"].create({
              text: text,
              owner: user._id,
              video: id
            });

          case 11:
            comment = _context9.sent;
            video.comments.push(comment._id);
            video.save();
            return _context9.abrupt("return", res.status(201).json({
              newCommentId: comment._id
            }));

          case 15:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function createComment(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.createComment = createComment;