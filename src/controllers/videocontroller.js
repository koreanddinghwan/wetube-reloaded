import Video from "../models/Videos.js";
import User from "../models/User.js";
import flash from "express-flash";
import { async } from "regenerator-runtime";

export const Home = async (req, res) => {
  let videos = [];
  try {
    let videos = await Video.find({})
      .sort({ creationAt: "desc" })
      .populate("owner");
    console.log(videos);
    return res.render("home", { pageTitle: "Home", videos });
  } catch {
    return res.render("home", { pageTitle: "Home", videos });
  }
};
export const Watchvideo = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id).populate("owner");

    res.render("Watchvideo", { pageTitle: "Watch", video });
  } catch {
    return res.status(404).render("404", { pageTitle: "404" });
  }
};

export const Getuploadvideo = (req, res) => {
  return res.render("upload", { pageTitle: "upload" });
};
export const Postuploadvideo = async (req, res) => {
  const { video, thumb } = req.files;

  const {
    user: { _id },
  } = req.session;

  const { title, description, hashtags } = req.body;
  try {
    const newVideo = await Video.create({
      title,
      description,
      fileUrl: video[0].path,
      thumbUrl: thumb[0].path,
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });

    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();

    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "upload",
      errormessage: error._message,
    });
  }
};
export const Geteditvideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;

  const video = await Video.findById(id);

  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
  }

  return res.render("edit", { pageTitle: "Edit", video });
};
export const Posteditvideo = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.session;

  const { title, description, hashtags } = req.body;
  const video = Video.exists({ _id: id });

  if (!video) {
    return res.render("404");
  }
  if (String(video.owner) !== String(_id)) {
    return res.status(403).redirect("/");
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
  const {
    user: { _id },
  } = req.session;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }

  if (String(video.owner) !== String(_id)) {
    req.flash("error", "권한이 없습니다");
    return res.status(403).redirect("/");
  }
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
  }).populate("owner");

  res.render("Search", { pageTitle: "Search", videos });
};

export const registerView = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findById(id);

  if (!video) {
    return res.sendStatus(404);
  }

  video.meta.views += 1;
  await video.save();

  return res.sendStatus(200);
};

export const createComment = async (req, res) => {
  const text = req.body.text;
  console.log(req.body);
  res.end();
};
