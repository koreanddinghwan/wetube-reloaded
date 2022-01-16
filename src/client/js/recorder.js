const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;

const handleStop = () => {
  startBtn.innerText = "Start Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleStart);
};

const handleStart = () => {
  console.log("record");
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart);
  startBtn.addEventListener("click", handleStop);

  const recorder = new MediaRecorder(stream);
  recorder.ondataavailable = (e) => console.log(e);
  console.log("beforestart", recorder);
  recorder.start();
  console.log("afterstart", recorder);
  setTimeout(() => {
    recorder.stop();
  }, 10000);
};

const init = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { width: 200, height: 100 },
    });
    console.log(stream);
    video.srcObject = stream;
    video.play();
  } catch (e) {
    console.log(e);
  }
};

init();

startBtn.addEventListener("click", handleStart);
