'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.css'

// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom';

class VideoPlayer extends React.Component { // MyCoolApp is the name of the app
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createVideo = this.createVideo.bind(this);
    this.videoInfo = this.videoInfo.bind(this);
  }
  

  // const input = document.querySelector('input[type="file"]');

  // input.addEventListener('change', function (e) {
  //   e.preventDefault();
  //   let fileName = input.files[0].name;
  //   let tmppath = URL.createObjectURL(event.target.files[0]);
  //   console.log('file info:', input.files[0])
  
  //   createVideo(tmppath, fileName);
  // }, false);

  handleChange(event) {
    this.setState({value: event.target.value});
    // let path = event.target.value;
    // console.log('Handle Change:', path);
    let fileName = event.target.files[0].name;
    console.log('file name:', fileName);
    let tmppath = URL.createObjectURL(event.target.files[0]);
    console.log('temp path:', tmppath);

    this.createVideo(tmppath, fileName);
  }

  handleSubmit(event) {
    alert('file selected: ' + this.state.value);
    event.preventDefault();
  }

  videoInfo() {
    let fileName = input.files[0].name;
    let tmppath = URL.createObjectURL(event.target.files[0]);

    createVideo(tmppath, fileName);
  }
  
  createVideo(videoFile) {
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
  };

  render() { // JSX
    return <div>
      <h1>Video Player</h1>
      <p>Choose a local video video file to play in web browser.</p>
      {/* <input onClick={videoInfo} type="file" id="video"></input> */}

      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="file" value={this.state.value} onChange={this.handleChange} />
        </label>
      </form>

      {/* <input type="file" id="video"></input> */}
      <div id="video-player"></div>
      </div>;
  }
}

const root = document.getElementById('root');
ReactDOM.render(<VideoPlayer />, root);  // Class and render need to be the same.