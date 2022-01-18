import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const actionBtn = document.getElementById("actionBtn");
const video = document.getElementById("preview");

let stream;
let recorder;
let videoFile;

const files = {
  input: "recording.webm",
  output: "output.mp4",
  thumbnail: "thumbnail.jpg",
};

const downloadFile = (fileUrl, fileName) => {
  const a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName; //a태그은 download프로퍼티 가진다.
  document.body.appendChild(a);
  a.click(); //브라우저상에서 클릭
};

const handleDownload = async () => {
  actionBtn.removeEventListener("click", handleDownload);

  actionBtn.innerText = "Transecoding...";

  actionBtn.disabled = true;

  const ffmpeg = createFFmpeg({ log: true });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", files.input, await fetchFile(videoFile)); //메모리에파일작성

  await ffmpeg.run("-i", files.input, "-r", "60", files.output); //메모리의 파일을 mp4로 변환
  await ffmpeg.run(
    "-i",
    files.input,
    "-ss",
    "00:00:01",
    "-frames:v",
    "1",
    files.thumbnail
  ); //스크린샷

  const mp4File = ffmpeg.FS("readFile", files.output);
  const thumbFile = ffmpeg.FS("readFile", files.thumbnail);

  const mp4Blob = new Blob([mp4File.buffer], { type: "video/mp4" }); //버퍼로 바이너리객체로 파일생성
  const thumbBlob = new Blob([thumbFile.buffer], { type: "image/jpg" });

  const mp4Url = URL.createObjectURL(mp4Blob); //url접근가능한 파일을 브라우저에 담아준다.
  const thumbUrl = URL.createObjectURL(thumbBlob);

  downloadFile(mp4Url, "MyRecording.mp4");
  downloadFile(thumbUrl, "Mythumbnail.jpg");

  //파일해제
  ffmpeg.FS("unlink", files.input);
  ffmpeg.FS("unlink", files.output);
  ffmpeg.FS("unlink", files.thumbnail);

  //브라우저에 저장된 파일 URL삭제
  URL.revokeObjectURL(mp4Url);
  URL.revokeObjectURL(thumbUrl);
  URL.revokeObjectURL(videoFile);

  actionBtn.disabled = false;
  actionBtn.innerText = "Record again";
  actionBtn.addEventListener("click", handleStart);
};

const handleStop = () => {
  actionBtn.innerText = "Download Recording";
  actionBtn.removeEventListener("click", handleStop);
  actionBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

const handleStart = () => {
  console.log("record");
  actionBtn.innerText = "Stop Recording";
  actionBtn.removeEventListener("click", handleStart); //원래있던 이벤트리스너 제거해줘야 안겹침
  actionBtn.addEventListener("click", handleStop);

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
      video: { width: 1024, height: 576 },
    }); //0과 1로된 데이터를 만들어줌
    console.log(stream);
    video.srcObject = stream; //video태그에 srcObject프로퍼티로 stream을 넣어준다.
    video.play(); //실시간으로 stream으로 받아온 데이터가 video태그에 담기면서  비디오가 재생됨
  } catch (e) {
    console.log(e);
  }
};

init();

actionBtn.addEventListener("click", handleStart);
