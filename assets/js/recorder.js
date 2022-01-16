/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/recorder.js":
/*!***********************************!*\
  !*** ./src/client/js/recorder.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar startBtn = document.getElementById(\"startBtn\");\nvar video = document.getElementById(\"preview\");\nvar stream;\nvar recorder;\nvar videoFile;\n\nvar handleDownload = function handleDownload() {\n  var a = document.createElement(\"a\");\n  a.href = videoFile;\n  a.download = \"MyRecording.webm\"; //a태그은 download프로퍼티 가진다.\n\n  document.body.appendChild(a);\n  a.click(); //브라우저상에서 클릭\n};\n\nvar handleStop = function handleStop() {\n  startBtn.innerText = \"Download Recording\";\n  startBtn.removeEventListener(\"click\", handleStop);\n  startBtn.addEventListener(\"click\", handleDownload);\n  recorder.stop();\n};\n\nvar handleStart = function handleStart() {\n  console.log(\"record\");\n  startBtn.innerText = \"Stop Recording\";\n  startBtn.removeEventListener(\"click\", handleStart); //원래있던 이벤트리스너 제거해줘야 안겹침\n\n  startBtn.addEventListener(\"click\", handleStop);\n  recorder = new MediaRecorder(stream); //stream으로 MediaRecorder프로미스 객체 생성\n\n  recorder.ondataavailable = function (e) {\n    //녹화 stop되면 발생되는 이벤트에서 비디오 데이터 받아옴.\n    console.log(e.data);\n    videoFile = URL.createObjectURL(e.data); //브라우저 메모리상에 비디오파일 저장함. 이걸 가져옴\n\n    console.log(videoFile);\n    video.srcObject = null; //미리보기의 srcObject초기화후.\n\n    video.src = videoFile; //src를 e.data로 변경하고\n\n    video.loop = true; //비디오태그 재생 루프\n\n    video.play();\n  };\n\n  recorder.start();\n};\n\nvar init = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _context.next = 3;\n            return navigator.mediaDevices.getUserMedia({\n              //카메라, 마이크 등의 컴퓨터의 미디어장비에 접근\n              audio: false,\n              video: {\n                width: 200,\n                height: 100\n              }\n            });\n\n          case 3:\n            stream = _context.sent;\n            //0과 1로된 데이터를 만들어줌\n            console.log(stream);\n            video.srcObject = stream; //video태그에 srcObject프로퍼티로 stream을 넣어준다.\n\n            video.play(); //실시간으로 stream으로 받아온 데이터가 video태그에 담기면서  비디오가 재생됨\n\n            _context.next = 12;\n            break;\n\n          case 9:\n            _context.prev = 9;\n            _context.t0 = _context[\"catch\"](0);\n            console.log(_context.t0);\n\n          case 12:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 9]]);\n  }));\n\n  return function init() {\n    return _ref.apply(this, arguments);\n  };\n}();\n\ninit();\nstartBtn.addEventListener(\"click\", handleStart);\n\n//# sourceURL=webpack://wetube/./src/client/js/recorder.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/recorder.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;