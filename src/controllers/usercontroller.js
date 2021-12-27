import express from "express";
import User from "../models/User";
import bcryptjs from "bcryptjs";

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
  //check account exist
  const user = await User.findOne({ username });
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
  return res.render("Logout");
};
export const Edituser = (req, res) => {
  return res.render("Edituser");
};
export const DeleteUser = (req, res) => {
  return res.render("DeleteUser");
};
