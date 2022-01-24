"use strict";

var _ffmpeg = require("@ffmpeg/ffmpeg");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var actionBtn = document.getElementById("actionBtn");
var video = document.getElementById("preview");
var stream;
var recorder;
var videoFile;
var files = {
  input: "recording.webm",
  output: "output.mp4",
  thumbnail: "thumbnail.jpg"
};

var downloadFile = function downloadFile(fileUrl, fileName) {
  var a = document.createElement("a");
  a.href = fileUrl;
  a.download = fileName; //a태그은 download프로퍼티 가진다.

  document.body.appendChild(a);
  a.click(); //브라우저상에서 클릭
};

var handleDownload = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var ffmpeg, mp4File, thumbFile, mp4Blob, thumbBlob, mp4Url, thumbUrl;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            actionBtn.removeEventListener("click", handleDownload);
            actionBtn.innerText = "Transecoding...";
            actionBtn.disabled = true;
            ffmpeg = (0, _ffmpeg.createFFmpeg)({
              log: true
            });
            _context.next = 6;
            return ffmpeg.load();

          case 6:
            _context.t0 = ffmpeg;
            _context.t1 = files.input;
            _context.next = 10;
            return (0, _ffmpeg.fetchFile)(videoFile);

          case 10:
            _context.t2 = _context.sent;

            _context.t0.FS.call(_context.t0, "writeFile", _context.t1, _context.t2);

            _context.next = 14;
            return ffmpeg.run("-i", files.input, "-r", "60", files.output);

          case 14:
            _context.next = 16;
            return ffmpeg.run("-i", files.input, "-ss", "00:00:01", "-frames:v", "1", files.thumbnail);

          case 16:
            //스크린샷
            mp4File = ffmpeg.FS("readFile", files.output);
            thumbFile = ffmpeg.FS("readFile", files.thumbnail);
            mp4Blob = new Blob([mp4File.buffer], {
              type: "video/mp4"
            }); //버퍼로 바이너리객체로 파일생성

            thumbBlob = new Blob([thumbFile.buffer], {
              type: "image/jpg"
            });
            mp4Url = URL.createObjectURL(mp4Blob); //url접근가능한 파일을 브라우저에 담아준다.

            thumbUrl = URL.createObjectURL(thumbBlob);
            downloadFile(mp4Url, "MyRecording.mp4");
            downloadFile(thumbUrl, "Mythumbnail.jpg"); //파일해제

            ffmpeg.FS("unlink", files.input);
            ffmpeg.FS("unlink", files.output);
            ffmpeg.FS("unlink", files.thumbnail); //브라우저에 저장된 파일 URL삭제

            URL.revokeObjectURL(mp4Url);
            URL.revokeObjectURL(thumbUrl);
            URL.revokeObjectURL(videoFile);
            actionBtn.disabled = false;
            actionBtn.innerText = "Record again";
            actionBtn.addEventListener("click", handleStart);

          case 33:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleDownload() {
    return _ref.apply(this, arguments);
  };
}();

var handleStop = function handleStop() {
  actionBtn.innerText = "Download Recording";
  actionBtn.removeEventListener("click", handleStop);
  actionBtn.addEventListener("click", handleDownload);
  recorder.stop();
};

var handleStart = function handleStart() {
  console.log("record");
  actionBtn.innerText = "Stop Recording";
  actionBtn.removeEventListener("click", handleStart); //원래있던 이벤트리스너 제거해줘야 안겹침

  actionBtn.addEventListener("click", handleStop);
  recorder = new MediaRecorder(stream); //stream으로 MediaRecorder프로미스 객체 생성

  recorder.ondataavailable = function (e) {
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

var init = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return navigator.mediaDevices.getUserMedia({
              //카메라, 마이크 등의 컴퓨터의 미디어장비에 접근
              audio: false,
              video: {
                width: 1024,
                height: 576
              }
            });

          case 3:
            stream = _context2.sent;
            //0과 1로된 데이터를 만들어줌
            console.log(stream);
            video.srcObject = stream; //video태그에 srcObject프로퍼티로 stream을 넣어준다.

            video.play(); //실시간으로 stream으로 받아온 데이터가 video태그에 담기면서  비디오가 재생됨

            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function init() {
    return _ref2.apply(this, arguments);
  };
}();

init();
actionBtn.addEventListener("click", handleStart);