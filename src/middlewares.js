import multer from "multer";

// 현재 로그인된 사용자의 정보를 세션으로부터 받아서 locals 전역객체에 저장하는 미들웨어
export const localsMiddleware = (req, res, next) => {
  //세션의 정보를 확인해 locals(전역객체)로 정보를 이전.(pug에서사용)
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user || {};

  next();
};

//로그인정보 있는지 검증
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    //브라우저 세션에 로그인정보잇으면
    next();
  } else {
    req.flash("error", "권한이 없습니다");
    return res.redirect("/"); //없으면
  }
};

//로그인 정보 없는지 검증
export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    //브라우저 세션에 로그인정보없으면
    return next();
  } else {
    req.flash("error", "권한이 없습니다");
    return res.redirect("/");
  }
};

//
export const avatarUpload = multer({
  dest: "uploads/avatars",
  limits: { fileSize: 3000000 },
});
export const videoUpload = multer({
  dest: "uploads/videos",
  limits: { fileSize: 10000000 },
});
