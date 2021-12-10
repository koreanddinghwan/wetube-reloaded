const fakeUser = {
  username: "Nicolas",
  loggedIn: true,
};

const trending = (req, res) => {
  const videos = [
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
  res.render("home", { pageTitle: "Home", fakeUser: fakeUser, videos });
};
const Seevideo = (req, res) => res.render("watch", { pageTitle: "Watch" });
const Editvideo = (req, res) => res.render("edit", { pageTitle: "Edit" });

const Deletevideo = (req, res) => res.send("Delete Video");
const Search = (req, res) => res.send("Search");
const Upload = (req, res) => res.send("Upload");

export { Editvideo, Seevideo, trending, Search, Deletevideo, Upload };
