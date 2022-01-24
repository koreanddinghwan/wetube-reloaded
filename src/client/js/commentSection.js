import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.classList = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("span");
  newComment.appendChild(icon);
  newComment.appendChild(span);

  videoComments.prepend(newComment);
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");

  const text = textarea.value;
  const videoId = videoContainer.dataset.videoid; //videocontainer의 dataset프로퍼티이용

  if (text === "") {
    return;
  }

  const { status } = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      //request의 정보를 담는다.
      "Content-Type": "application/json", //express.json 미들웨어를 사용하게끔 express에게 알려준다.
    },
    body: JSON.stringify({ text: text }),
  });

  textarea.value = "";
  if (status === 201) {
    console.log("create fake comment");
    addComment(text);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
