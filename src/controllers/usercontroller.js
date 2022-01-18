import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import fetch from "node-fetch";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "JOIN" });
};
export const postJoin = async (req, res) => {
  const { name, username, email, password, password2, location } = req.body;
  const pageTitle = "Join";
  console.log(req.body);
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Password confirmation does not match.",
    });
  }
  const exists = await User.exists({ $or: [{ username }, { email }] });
  console.log(exists);
  if (exists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This username/email is already taken.",
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
    return res.status(400).render("join", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};
export const getLogin = (req, res) => {
  return res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const pageTitle = "login";
  //check account exist(not github login)
  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    return res.status(400).render(pageTitle, {
      pageTitle,
      errorMessage: "Can not find username",
    });
  }
  //check if password exist
  const ok = await bcryptjs.compare(password, user.password);
  if (!ok) {
    return res.status(400).render(pageTitle, {
      pageTitle,
      errorMessage: "Wrong Password",
    });
  }

  //로그인 성공하면 세션에 loggedin, user정보 저장
  req.session.loggedIn = true;
  req.session.user = user;
  return res.redirect("/");
};

export const Logout = (req, res) => {
  req.session.destroy();
  req.flash("info", "Bye");
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  //깃허브로그인버튼 누르면 실행되는 컨트롤러
  const baseUrl = `https://github.com/login/oauth/authorize`;

  const config = {
    client_id: process.env.GH_CLIENT,
    allow_signup: false,
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();

  const finalUrl = `${baseUrl}?${params}`;
  //위의 정보를 가지고 authorization페이지로 넘어간다.
  return res.redirect(finalUrl); //authorizaion페이지로 가는 컨트롤러
};

export const finishGithubLogin = async (req, res) => {
  //authorizaition페이지에서 authorizaion한 경우, 콜백으로 이 컨트롤러가 실행된다
  //http://localhost:4000/user/github/finish/code=12312314로 돌아온다.
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT,
    client_secret: process.env.GH_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;

  //REST API방식으로, POST https://github.com/login/oauth/access_token에 위 정보를 config해서
  //post로 패치하면 액세스 토큰을 받아온다.
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  // 받아온 access token으로 정보 받아오기
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    //userData를 토큰으로 받아오기
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          //헤더에 이렇게 작성해서 패치하면 데이터 받아옴
          Authorization: `token ${access_token}`,
        },
      })
    ).json(); //await fetch~ await json

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          //동일
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    //parimary와 verified가 true인 이메일만 받아온다.
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );

    if (!emailObj) {
      //없으면 로그인페이지로 돌아가
      return res.redirect("/login");
    }

    //이메일 있으면 DB에서 이메일이 같은거 찾아오기
    let user = await User.findOne({
      email: emailObj.email,
    });
    // 같은 이메일 가진 유저가 없을때 만들고,
    if (!user) {
      const user = await User.create({
        avatarUrl: userData.avatar_url,
        username: userData.login,
        email: emailObj.email,
        password: "",
        socialOnly: true, //깃허브로 만든 계정임을 확인
        location: userData.location,
      });

      // 같은 이메일 가진 유저가 있으면 그 유저를 로그인시켜준다.
      //만든 유저로 로그인
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
    } else {
      req.session.loggedIn = true;
      req.session.user = user;
      return res.redirect("/");
    }
  }
};

//유저의 page get요청시 렌더링
export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit User" });
};

//유저가 form을 post method로 서버에 수정요청
export const postEdit = async (req, res) => {
  //id는 req.session.user, email,name...는 req.body에서
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { email, name, username, location },
    file,
  } = req;
  console.log("파일정보", file);

  //email과 username은 같으면 안된다. 로직
  //email과 username은 unique.
  //post로 form의 정보가 전송된 상태임

  //email과 username이 바뀌었다면, 현재세션의 정보와 post된 정보 비교해 유효성체크해야함

  //email바뀌었을때
  if (email !== req.session.user.email) {
    const DbEmail = await User.findOne({ email: email }); //db의 이메일을 찾아서
    console.log(DbEmail);
    if (DbEmail) {
      //있으면 에러
      console.log("이미있는 이메일");
      return res.render("edit-profile", {
        pageTitle: "Edit User",
        ErrorMessage: "이미 있는 이메일",
      });
    }
  }

  //username바뀌었을때
  if (username !== req.session.user.username) {
    const DbUsername = await User.findOne({ username: username });
    console.log(DbUsername);
    if (DbUsername) {
      console.log("이미있는유저이름입니다.");
      return res.render("edit-profile", {
        pageTitle: "Edit User",
        ErrorMessage: "이미 있는 유저이름",
      });
    }
  }

  //안바뀌었다면, 유효성체크할 필요없이 업데이트하면됨

  //Id로 user데이터를 찾고, 2번째 파라미터로 업데이트할 내용주기
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    {
      avatarUrl: file ? file.path : avatarUrl,
      name,
      email,
      username,
      location,
    },
    { new: true }
  );

  req.session.user = updatedUser;

  return res.redirect("/user/edit");
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    req.flash("error", "깃허브 계정은 못바꿈");
    return res.redirect("/");
  }
  return res.render("change-password", { pageTitle: "change Password" });
};

export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { OldPassword, NewPassword, NewPassword_confirm },
  } = req;

  //현재비밀번호란 확인
  const user = await User.findById(_id);
  const ok = await bcryptjs.compare(OldPassword, user.password); //입력된 기존비번과 db의 비밀번호비교
  if (!ok) {
    return res.status(400).render("change-password", {
      pageTitle: "change Password",
      errorMessage: "현재 비밀번호가 다릅니다.",
    });
  }

  //입력된 비밀번호 검증
  if (NewPassword !== NewPassword_confirm) {
    return res.status(400).render("change-password", {
      pageTitle: "change Password",
      errorMessage: "비밀번화 확인란의 비밀번호가 다릅니다.",
    });
  }

  //비밀번호 업데이트
  //db의 비밀번호 업데이트
  user.password = NewPassword;
  await user.save(); //presave 해시함수 미들웨어때문에 저장하면 자동으로 해시함수화된다.

  req.flash("info", "다시 로그인해줴숑");

  //세션의 유저 비밀번호는 그대로일 것이므로 초기화해준다.
  return res.redirect("/user/logout");
};

export const seeuser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).populate({
    path: "videos",
    populate: {
      path: "owner",
      model: "User",
    },
  });

  if (!user) {
    return res.status(404).render("404", { pageTitle: "usernotfound" });
  }
  return res.render("profile", { pageTitle: user.name, user });
};
