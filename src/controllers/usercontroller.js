import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import fetch from "node-fetch";

export const getJoin = (req, res) => {
  return res.render("join", { pageTitle: "JOIN" });
};
export const postJoin = async (req, res) => {
  const { name, username, email, password, confirmpassword, location } =
    req.body;
  const pageTitle = "Join";

  //password check
  if (password !== confirmpassword) {
    return res.status(400).render(pageTitle, {
      pageTitle,
      errorMessage: "password not true",
    });
  }
  //username/email check
  const exist = await User.exists({ $or: [{ username }, { email }] });
  if (exist) {
    return res.status(400).render(pageTitle, {
      pageTitle,
      errorMessage: "username/email already exists",
    });
  }

  //db생성
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
    return res.status(400).render(pageTitle, {
      pageTitle,
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
export const Seeuser = (req, res) => {
  return res.render("Seeuser");
};
export const Logout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

//유저의 page get요청시 렌더링
export const getEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "Edit User" });
};

//유저가 form을 post method로 서버에 수정요청
export const postEdit = (req, res) => {
  return res.render("edit-profile");
};
export const DeleteUser = (req, res) => {
  return res.render("DeleteUser");
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

  console.log("토큰", tokenRequest);

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

    console.log("test", userData);

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          //동일
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    console.log(emailData);

    //parimary와 verified가 true인 이메일만 받아온다.
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );

    console.log(emailObj);

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
        name: userData.name,
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
      return res.redirect("/login");
    }
  }
};
