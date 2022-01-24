"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startGithubLogin = exports.seeuser = exports.postLogin = exports.postJoin = exports.postEdit = exports.postChangePassword = exports.getLogin = exports.getJoin = exports.getEdit = exports.getChangePassword = exports.finishGithubLogin = exports.Logout = void 0;

var _User = _interopRequireDefault(require("../models/User.js"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _expressFlash = _interopRequireDefault(require("express-flash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getJoin = function getJoin(req, res) {
  return res.render("join", {
    pageTitle: "JOIN"
  });
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var _req$body, name, username, email, password, password2, location, pageTitle, exists;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, username = _req$body.username, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2, location = _req$body.location;
            pageTitle = "Join";
            console.log(req.body);

            if (!(password !== password2)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "Password confirmation does not match."
            }));

          case 5:
            _context.next = 7;
            return _User["default"].exists({
              $or: [{
                username: username
              }, {
                email: email
              }]
            });

          case 7:
            exists = _context.sent;
            console.log(exists);

            if (!exists) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", res.status(400).render("join", {
              pageTitle: pageTitle,
              errorMessage: "This username/email is already taken."
            }));

          case 11:
            _context.prev = 11;
            _context.next = 14;
            return _User["default"].create({
              name: name,
              username: username,
              email: email,
              password: password,
              location: location
            });

          case 14:
            return _context.abrupt("return", res.redirect("/login"));

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](11);
            console.log(_context.t0);
            return _context.abrupt("return", res.status(400).render("join", {
              pageTitle: "Upload Video",
              errorMessage: _context.t0._message
            }));

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[11, 17]]);
  }));

  return function postJoin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  return res.render("login", {
    pageTitle: "Login"
  });
};

exports.getLogin = getLogin;

var postLogin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var _req$body2, username, password, pageTitle, user, ok;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body2 = req.body, username = _req$body2.username, password = _req$body2.password;
            pageTitle = "login"; //check account exist(not github login)

            _context2.next = 4;
            return _User["default"].findOne({
              username: username,
              socialOnly: false
            });

          case 4:
            user = _context2.sent;

            if (user) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", res.status(400).render(pageTitle, {
              pageTitle: pageTitle,
              errorMessage: "Can not find username"
            }));

          case 7:
            _context2.next = 9;
            return _bcryptjs["default"].compare(password, user.password);

          case 9:
            ok = _context2.sent;

            if (ok) {
              _context2.next = 12;
              break;
            }

            return _context2.abrupt("return", res.status(400).render(pageTitle, {
              pageTitle: pageTitle,
              errorMessage: "Wrong Password"
            }));

          case 12:
            //로그인 성공하면 세션에 loggedin, user정보 저장
            req.session.loggedIn = true;
            req.session.user = user;
            return _context2.abrupt("return", res.redirect("/"));

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function postLogin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postLogin = postLogin;

var Logout = function Logout(req, res) {
  req.flash("info", "Bye");
  req.session.destroy();
  return res.redirect("/");
};

exports.Logout = Logout;

var startGithubLogin = function startGithubLogin(req, res) {
  //깃허브로그인버튼 누르면 실행되는 컨트롤러
  var baseUrl = "https://github.com/login/oauth/authorize";
  var config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email"
  };
  var params = new URLSearchParams(config).toString();
  var finalUrl = "".concat(baseUrl, "?").concat(params); //위의 정보를 가지고 authorization페이지로 넘어간다.

  return res.redirect(finalUrl); //authorizaion페이지로 가는 컨트롤러
};

exports.startGithubLogin = startGithubLogin;

var finishGithubLogin = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var baseUrl, config, params, finalUrl, tokenRequest, access_token, apiUrl, userData, emailData, emailObj, user, _user;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            //authorizaition페이지에서 authorizaion한 경우, 콜백으로 이 컨트롤러가 실행된다
            //http://localhost:4000/user/github/finish/code=12312314로 돌아온다.
            baseUrl = "https://github.com/login/oauth/access_token";
            config = {
              client_id: process.env.GH_CLIENT,
              client_secret: process.env.GH_SECRET,
              code: req.query.code
            };
            params = new URLSearchParams(config).toString();
            finalUrl = "".concat(baseUrl, "?").concat(params); //REST API방식으로, POST https://github.com/login/oauth/access_token에 위 정보를 config해서
            //post로 패치하면 액세스 토큰을 받아온다.

            _context3.next = 6;
            return (0, _nodeFetch["default"])(finalUrl, {
              method: "POST",
              headers: {
                Accept: "application/json"
              }
            });

          case 6:
            _context3.next = 8;
            return _context3.sent.json();

          case 8:
            tokenRequest = _context3.sent;

            if (!("access_token" in tokenRequest)) {
              _context3.next = 40;
              break;
            }

            access_token = tokenRequest.access_token;
            apiUrl = "https://api.github.com"; //userData를 토큰으로 받아오기

            _context3.next = 14;
            return (0, _nodeFetch["default"])("".concat(apiUrl, "/user"), {
              headers: {
                //헤더에 이렇게 작성해서 패치하면 데이터 받아옴
                Authorization: "token ".concat(access_token)
              }
            });

          case 14:
            _context3.next = 16;
            return _context3.sent.json();

          case 16:
            userData = _context3.sent;
            _context3.next = 19;
            return (0, _nodeFetch["default"])("".concat(apiUrl, "/user/emails"), {
              headers: {
                //동일
                Authorization: "token ".concat(access_token)
              }
            });

          case 19:
            _context3.next = 21;
            return _context3.sent.json();

          case 21:
            emailData = _context3.sent;
            //parimary와 verified가 true인 이메일만 받아온다.
            emailObj = emailData.find(function (email) {
              return email.primary === true && email.verified === true;
            });

            if (emailObj) {
              _context3.next = 25;
              break;
            }

            return _context3.abrupt("return", res.redirect("/login"));

          case 25:
            _context3.next = 27;
            return _User["default"].findOne({
              email: emailObj.email
            });

          case 27:
            user = _context3.sent;

            if (user) {
              _context3.next = 37;
              break;
            }

            _context3.next = 31;
            return _User["default"].create({
              avatarUrl: userData.avatar_url,
              username: userData.login,
              email: emailObj.email,
              password: "",
              socialOnly: true,
              //깃허브로 만든 계정임을 확인
              location: userData.location
            });

          case 31:
            _user = _context3.sent;
            // 같은 이메일 가진 유저가 있으면 그 유저를 로그인시켜준다.
            //만든 유저로 로그인
            req.session.loggedIn = true;
            req.session.user = _user;
            return _context3.abrupt("return", res.redirect("/"));

          case 37:
            req.session.loggedIn = true;
            req.session.user = user;
            return _context3.abrupt("return", res.redirect("/"));

          case 40:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function finishGithubLogin(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //유저의 page get요청시 렌더링


exports.finishGithubLogin = finishGithubLogin;

var getEdit = function getEdit(req, res) {
  return res.render("edit-profile", {
    pageTitle: "Edit User"
  });
}; //유저가 form을 post method로 서버에 수정요청


exports.getEdit = getEdit;

var postEdit = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$session$user, _id, avatarUrl, _req$body3, email, name, username, location, file, DbEmail, DbUsername, updatedUser;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            //id는 req.session.user, email,name...는 req.body에서
            _req$session$user = req.session.user, _id = _req$session$user._id, avatarUrl = _req$session$user.avatarUrl, _req$body3 = req.body, email = _req$body3.email, name = _req$body3.name, username = _req$body3.username, location = _req$body3.location, file = req.file;
            console.log("파일정보", file); //email과 username은 같으면 안된다. 로직
            //email과 username은 unique.
            //post로 form의 정보가 전송된 상태임
            //email과 username이 바뀌었다면, 현재세션의 정보와 post된 정보 비교해 유효성체크해야함
            //email바뀌었을때

            if (!(email !== req.session.user.email)) {
              _context4.next = 10;
              break;
            }

            _context4.next = 5;
            return _User["default"].findOne({
              email: email
            });

          case 5:
            DbEmail = _context4.sent;
            //db의 이메일을 찾아서
            console.log(DbEmail);

            if (!DbEmail) {
              _context4.next = 10;
              break;
            }

            //있으면 에러
            console.log("이미있는 이메일");
            return _context4.abrupt("return", res.render("edit-profile", {
              pageTitle: "Edit User",
              ErrorMessage: "이미 있는 이메일"
            }));

          case 10:
            if (!(username !== req.session.user.username)) {
              _context4.next = 18;
              break;
            }

            _context4.next = 13;
            return _User["default"].findOne({
              username: username
            });

          case 13:
            DbUsername = _context4.sent;
            console.log(DbUsername);

            if (!DbUsername) {
              _context4.next = 18;
              break;
            }

            console.log("이미있는유저이름입니다.");
            return _context4.abrupt("return", res.render("edit-profile", {
              pageTitle: "Edit User",
              ErrorMessage: "이미 있는 유저이름"
            }));

          case 18:
            _context4.next = 20;
            return _User["default"].findByIdAndUpdate(_id, {
              avatarUrl: file ? file.path : avatarUrl,
              name: name,
              email: email,
              username: username,
              location: location
            }, {
              "new": true
            });

          case 20:
            updatedUser = _context4.sent;
            req.session.user = updatedUser;
            return _context4.abrupt("return", res.redirect("/user/edit"));

          case 23:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function postEdit(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postEdit = postEdit;

var getChangePassword = function getChangePassword(req, res) {
  if (req.session.user.socialOnly === true) {
    req.flash("error", "깃허브 계정은 못바꿈");
    return res.redirect("/");
  }

  return res.render("change-password", {
    pageTitle: "change Password"
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _id, _req$body4, OldPassword, NewPassword, NewPassword_confirm, user, ok;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _id = req.session.user._id, _req$body4 = req.body, OldPassword = _req$body4.OldPassword, NewPassword = _req$body4.NewPassword, NewPassword_confirm = _req$body4.NewPassword_confirm; //현재비밀번호란 확인

            _context5.next = 3;
            return _User["default"].findById(_id);

          case 3:
            user = _context5.sent;
            _context5.next = 6;
            return _bcryptjs["default"].compare(OldPassword, user.password);

          case 6:
            ok = _context5.sent;

            if (ok) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", res.status(400).render("change-password", {
              pageTitle: "change Password",
              errorMessage: "현재 비밀번호가 다릅니다."
            }));

          case 9:
            if (!(NewPassword !== NewPassword_confirm)) {
              _context5.next = 11;
              break;
            }

            return _context5.abrupt("return", res.status(400).render("change-password", {
              pageTitle: "change Password",
              errorMessage: "비밀번화 확인란의 비밀번호가 다릅니다."
            }));

          case 11:
            //비밀번호 업데이트
            //db의 비밀번호 업데이트
            user.password = NewPassword;
            _context5.next = 14;
            return user.save();

          case 14:
            //presave 해시함수 미들웨어때문에 저장하면 자동으로 해시함수화된다.
            req.flash("info", "다시 로그인해줴숑"); //세션의 유저 비밀번호는 그대로일 것이므로 초기화해준다.

            return _context5.abrupt("return", res.redirect("/user/logout"));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function postChangePassword(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postChangePassword = postChangePassword;

var seeuser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _context6.next = 3;
            return _User["default"].findById(id).populate({
              path: "videos",
              populate: {
                path: "owner",
                model: "User"
              }
            });

          case 3:
            user = _context6.sent;

            if (user) {
              _context6.next = 6;
              break;
            }

            return _context6.abrupt("return", res.status(404).render("404", {
              pageTitle: "usernotfound"
            }));

          case 6:
            return _context6.abrupt("return", res.render("profile", {
              pageTitle: user.name,
              user: user
            }));

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function seeuser(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.seeuser = seeuser;