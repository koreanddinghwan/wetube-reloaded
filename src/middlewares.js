//모든 유저가 브라우저로 요청할때마다 이 미들웨어를 거친다.

export const localsMiddleware = (req, res, next) => {
  console.log(res.locals);
  //세션의 정보를 확인해 locals(전역객체)로 정보를 이전.(pug에서사용)
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Wetube";
  res.locals.loggedInUser = req.session.user;
  next();
};
