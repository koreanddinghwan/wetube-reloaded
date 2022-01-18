import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const startBtn = document.getElementById("startBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;
let mp4Url;
let thumbUrl;

const handleDownload = async () => {
  try {
    const ffmpeg = createFFmpeg({ log: true });
    await ffmpeg.load();

    ffmpeg.FS("writeFile", "recording.webm", await fetchFile(videoFile));

    await ffmpeg.run("-i", "recording.webm", "-r", "60", "output.mp4");
    await ffmpeg.run(
      "-i",
      "recording.webm",
      "-ss",
      "00:00:01",
      "-frames:v",
      "1",
      "thumbnail.jpg"
    );

    const mp4File = ffmpeg.FS("readFile", "output.mp4");
    const thumbFile = ffmpeg.FS("readFile", "thumbnail.jpg");

    const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" });
    const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

    mp4Url = URL.createObjectURL(mp4Blob);
    thumbUrl = URL.createObjectURL(thumbBlob);
  } catch (e) {
    console.log(e);
  }
  const a = document.createElement("a");
  a.href = mp4Url;
  a.download = "MyRecording.mp4"; //a태그은 download프로퍼티 가진다.
  document.body.appendChild(a);
  a.click(); //브라우저상에서 클릭

  const thumbA = document.createElement("a");
  thumbA.href = thumbUrl;
  thumbA.download = "Mythumbnail.jpg"; //a태그은 download프로퍼티 가진다.
  document.body.appendChild(thumbA);
  thumbA.click(); //브라우저상에서 클릭
};

const handleStop = () => {
  startBtn.innerText = "Download Recording";
  startBtn.removeEventListener("click", handleStop);
  startBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  console.log("record");
  startBtn.innerText = "Stop Recording";
  startBtn.removeEventListener("click", handleStart); //원래있던 이벤트리스너 제거해줘야 안겹침
  startBtn.addEventListener("click", handleStop);

  recorder = new MediaRecorder(stream); //stream으로 MediaRecorder프로미스 객체 생성
  recorder.ondataavailable = (e) => {
    //녹화 stop되면 발생되는 이벤트에서 비디오 데이터 받아옴.
    console.log(e.data);
    videoFile = URL.createObjectURL(e.data); //브라우저 메모리상에 비디오파일 저장함. 이걸 가져옴
    console.log(videoFile);
    video.srcObject = null; //미리보기의 srcObject초기화후.
    video.src = videoFile; //src를 e.data로 변경하고
    video.loop = true; //비디오태그 재생 루프
    video.play();
  };

  recorder.start();
};

const init = async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      //카메라, 마이크 등의 컴퓨터의 미디어장비에 접근
      audio: false,
      video: { width: 200, height: 100 },
    }); //0과 1로된 데이터를 만들어줌
    console.log(stream);
    video.srcObject = stream; //video태그에 srcObject프로퍼티로 stream을 넣어준다.
    video.play(); //실시간으로 stream으로 받아온 데이터가 video태그에 담기면서  비디오가 재생됨
  } catch (e) {
    console.log(e);
  }
};

init();

startBtn.addEventListener("click", handleStart);
