import express from "express";

export const Join = (res, req) => {
  return res.render("Joinpage");
};
export const Login = (res, req) => {
  return res.render("Loginpage");
};
export const Seeuser = (res, req) => {
  return res.render("Seeuser");
};
export const Logout = (res, req) => {
  return res.render("Logout");
};
export const Edituser = (res, req) => {
  return res.render("Edituser");
};
export const DeleteUser = (res, req) => {
  return res.render("DeleteUser");
};
