const fakeUser = {
  username: "Nicolas",
  loggedIn: true,
};
let videos = [
  {
    title: "returning HTML",
    id: 1,
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
  },
  {
    title: "configuring Pug",
    rating: 5,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 2,
  },
  {
    title: "Partials",
    rating: 3,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 3,
  },
  {
    title: "Extending Templates",
    rating: 1,
    comments: 2,
    createdAt: "2 minutes ago",
    views: 59,
    id: 4,
  },
];
const trending = (req, res) => {
  res.render("home", { videos });
};

const watch = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  res.render("watch", { pageTitle: "Watch" + " " + video.title, video }); //watch.oug 는 pageTitle과 video를 보내줘야함
};

const getEdit = (req, res) => {
  const { id } = req.params;
  const video = videos[id - 1];
  res.render("edit", { pageTitle: `Editing ${video.title}`, video });
};

export const postEdit = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  videos[id - 1].title = title;
  return res.redirect(`/videos/${id}`);
};

const Deletevideo = (req, res) => res.send("Delete Video");
const Search = (req, res) => res.send("Search");
const Upload = (req, res) => res.send("Upload");

export { getEdit, watch, trending, Search, Deletevideo, Upload };
