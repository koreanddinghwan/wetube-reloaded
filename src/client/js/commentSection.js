const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const textarea = form.querySelector("textarea");
const btn = form.querySelector("button");

const handleSubmit = (e) => {
  e.preventDefault();
  const text = textarea.value;
  const video = videoContainer.dataset.id; //videocontainer의 dataset프로퍼티이용
};

form.addEventListener("submit", handleSubmit);
