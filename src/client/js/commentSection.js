const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const handleSubmit = (e) => {
  e.preventDefault();
  const textarea = form.querySelector("textarea");

  const text = textarea.value;
  const videoId = videoContainer.dataset.videoid; //videocontainer의 dataset프로퍼티이용

  if (text === "") {
    return;
  }

  fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      //request의 정보를 담는다.
      "Content-Type": "application/json", //express.json 미들웨어를 사용하게끔 express에게 알려준다.
    },
    body: JSON.stringify({ text: text }),
  });

  textarea.value = "";
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}