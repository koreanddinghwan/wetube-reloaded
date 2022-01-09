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

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nvar playBtn = document.getElementById(\"play\");\nvar muteBtn = document.getElementById(\"mute\");\nvar volumeRange = document.getElementById(\"volumn\");\nvar video = document.querySelector(\"video\");\nvar currentTime = document.getElementById(\"currentTime\");\nvar totalTime = document.getElementById(\"totalTime\");\nvar timeLine = document.getElementById(\"timeline\");\nvar fullScreenBtn = document.getElementById(\"fullscreen\");\nvar videoContainer = document.getElementById(\"videoContainer\");\nvar volumeValue = 0.5; //볼륨값 저장변수\n\nvideo.volume = volumeValue;\n\nvar handlePlayClick = function handlePlayClick(e) {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n\n  playBtn.innerText = video.paused ? \"Play\" : \"Pause\";\n};\n\nvar handleMuteClick = function handleMuteClick(e) {\n  if (video.muted) {\n    video.muted = false;\n  } else {\n    video.muted = true;\n  }\n\n  muteBtn.innerText = video.muted ? \"UnMute\" : \"Mute\";\n  volumeRange.value = video.muted ? 0 : volumeValue;\n};\n\nvar handleVolumnChange = function handleVolumnChange(e) {\n  var value = e.target.value;\n\n  if (video.muted) {\n    video.muted = false;\n    muteBtn.innerText = \"Mute\";\n  }\n\n  volumeValue = value; //전역변수업데이트\n\n  video.volume = value; //video의 실제 볼륨조절\n};\n\nvar formatTime = function formatTime(seconds) {\n  return new Date(seconds * 1000).toISOString().substring(14, 19);\n};\n\nvar handleLooadedMetaData = function handleLooadedMetaData(e) {\n  totalTime.innerText = formatTime(Math.floor(video.duration));\n  timeLine.max = Math.floor(video.duration);\n};\n\nvar handleTimeUpdate = function handleTimeUpdate(e) {\n  currentTime.innerText = formatTime(Math.floor(video.currentTime));\n  timeLine.value = Math.floor(video.currentTime);\n};\n\nvar handleTimelineChange = function handleTimelineChange(e) {\n  var value = e.target.value;\n  video.currentTime = value;\n};\n\nvar handleClickScreen = function handleClickScreen(e) {\n  var fullScreen = document.fullscreenElement;\n\n  if (fullScreen) {\n    document.exitFullscreen();\n    fullScreenBtn.innerText = \"enter full screen\";\n  } else {\n    videoContainer.requestFullscreen();\n    fullScreenBtn.innerText = \"exit\";\n  }\n};\n\nplayBtn.addEventListener(\"click\", handlePlayClick);\nmuteBtn.addEventListener(\"click\", handleMuteClick);\nvolumeRange.addEventListener(\"input\", handleVolumnChange);\nvideo.addEventListener(\"loadedmetadata\", handleLooadedMetaData);\nvideo.addEventListener(\"timeupdate\", handleTimeUpdate);\ntimeLine.addEventListener(\"input\", handleTimelineChange);\nfullScreenBtn.addEventListener(\"click\", handleClickScreen);\n\n//# sourceURL=webpack://wetube/./src/client/js/videoPlayer.js?");

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
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;