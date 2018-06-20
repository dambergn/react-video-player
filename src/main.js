'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.css'

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleChange = this.handleChange.bind(this);
    this.createVideo = this.createVideo.bind(this);
  }

  handleChange(event) {
    let fileName = event.target.files[0].name;
    // console.log('file name:', fileName);
    let tmppath = URL.createObjectURL(event.target.files[0]);
    // console.log('temp path:', tmppath);

    this.createVideo(tmppath, fileName);
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
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="file" value={this.state.value} onChange={this.handleChange} />
        </label>
      </form>
      <div id="video-player"></div>
      </div>;
  }
}

const root = document.getElementById('root');
ReactDOM.render(<VideoPlayer />, root);