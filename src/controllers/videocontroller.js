import { red } from "color-name";
import { async } from "regenerator-runtime";
import Video from "../models/Videos";

export const Home = async (req, res) => {
  let videos = [];
  try {
    let videos = await Video.find({}).sort({ creationAt: "asc" });
    return res.render("home", { pageTitle: "Home", videos });
  } catch {
    return res.render("home", { pageTitle: "Home", videos });
  }
};
export const Watchvideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
    res.render("Watchvideo", { pageTitle: "Watch", video });
  } catch {
    return res.render("404", { pageTitle: "404" });
  }
};

export const Getuploadvideo = (req, res) => {
  return res.render("upload", { pageTitle: "upload" });
};
export const Postuploadvideo = async (req, res) => {
  console.log(req.body);
  const { title, description, hashtags } = req.body;
  try {
    await Video.create({
      title,
      description,
      hashtags: Video.formatHashtags(hashtags),
    });
    return res.redirect("/");
  } catch (error) {
    return res.render("upload", {
      pageTitle: "upload",
      errormessage: error._message,
    });
  }
};
export const Geteditvideo = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);
    res.render("edit", { pageTitle: "Edit", video });
  } catch {
    res.render("404");
  }
};
export const Posteditvideo = async (req, res) => {
  const { title, description, hashtags } = req.body;
  const video = Video.exists({ _id: id });
  const { id } = req.params;
  if (!video) {
    return res.render("404");
  }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  return res.redirect("/videos/" + `${id}`);
};
export const Deletevideo = async (req, res) => {
  const { id } = req.params;
  await Video.deleteOne({ id });
  res.redirect("/");
};

export const Search = async (req, res) => {
  let videos = [];
  const { keyword } = req.query;

  if (!keyword) {
    return res.render("Search", { pageTitle: "Search", videos });
  }

  videos = await Video.find({
    title: {
      $regex: new RegExp(`${keyword}$`, "i"),
    },
  });

  res.render("Search", { pageTitle: "Search", videos });
};
