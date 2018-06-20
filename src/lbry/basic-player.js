'use strict';

const input = document.querySelector('input[type="file"]');

input.addEventListener('change', function (e) {
  e.preventDefault();
  let fileName = input.files[0].name;
  let tmppath = URL.createObjectURL(event.target.files[0]);
  // console.log('input file', fileName);
  // console.log('file path', tmppath);
  console.log('file info:', input.files[0])
  // const reader = new FileReader();
  // reader.onload = function () {
  //   console.log(reader.result);
  // }
  // // reader.readAsArrayBuffer(input.files[0]);
  // reader.readAsDataURL(input.files[0]);

  createVideo(tmppath, fileName);
}, false);

function createVideo(videoFile) {
  var child = document.getElementById("video-player");
  child.parentNode.removeChild(child);

  let url = videoFile;
  let height = 720; //9
  let width = (height * 16) / 9; //16
  let video = document.createElement('video');
  video.setAttribute('id', 'video-player');
  video.setAttribute('width', width);
  video.setAttribute('height', height);
  video.setAttribute('controls', true);

  let source = document.createElement('source');
  source.setAttribute('src', url);
  source.setAttribute('type', 'video/mp4');

  video.appendChild(source);
  document.body.appendChild(video);
  // videoSize();


  // document.getElementById("video-player").height = "480";
};

// function videoSize() {
//   let playerSize = document.createElement('div');
//   video.setAttribute('id', 'player-size');

//   let size = document.createElement('button');
//   size.setAttribute('id', '480');
//   size.setAttribute('onclick', document.getElementById("video-player").height = "480");

//   video.appendChild(size);
//   document.body.appendChild(div);
// }