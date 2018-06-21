'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.css'

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieFileName: '',
      moviePath: '',
      isPlaying: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.movieInfo = this.movieInfo.bind(this);
    this.setBackground = this.setBackground.bind(this);
    this.setPoster = this.setPoster.bind(this);

    this.movieInformation = this.movieInformation.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.videoPlayer = this.videoPlayer.bind(this);
  }

  handleChange(event) {
    let fileName = event.target.files[0].name;
    // console.log('file name:', fileName);
    this.setState({
      movieFileName: event.target.files[0].name
    });

    let tmppath = URL.createObjectURL(event.target.files[0]);
    // console.log('temp path:', tmppath);
    this.setState({
      moviePath: URL.createObjectURL(event.target.files[0])
    });

    var movieName = fileName.split('(');  //remove extra data not related to movie name
    console.log(movieName);

    this.movieInfo(movieName[0]);

    // let info = document.getElementById("movie-information");
    // info.style.display === 'none';

  }

  movieInfo(movieName) {
    let movieInfo = document.createElement('div');
    movieInfo.setAttribute('id', 'movie-information');
  
    let img = document.createElement('img');
    img.setAttribute('id', 'movie-poster');
    img.setAttribute('onClick', this.playVideo);
  
    movieInfo.appendChild(img);
    document.body.appendChild(movieInfo);

    const api_url = 'http://mhzsys.net:21010/api'; // remote
    //const api_url = 'http://192.168.1.10:3000/api'; //local
    const images_uri = 'http://image.tmdb.org/t/p'
    const img_size = '/w500'

      return $.getJSON(`${api_url}/movies/${movieName}`).then(data => {
        console.log(data[0], 'got search results');
        // console.log(images_uri + img_size + data[0].backdrop_path);
        // document.body.style.backgroundImage = `"url('${images_uri + img_size + data[0].backdrop_path}')"`;
        // document.body.style.backgroundImage = "url('http://image.tmdb.org/t/p/w500/gBmrsugfWpiXRh13Vo3j0WW55qD.jpg')";
        // const bgImage = document.body.style.backgroundImage = `"url('${images_uri}${img_size}${data[0].backdrop_path}')"`;
        // console.log(bgImage);
        
        // this.setBackground(images_uri + img_size + data[0].backdrop_path);
        // this.setBackground(`${images_uri}${img_size}${data[0].backdrop_path}`);
        this.setPoster(`${images_uri}/w300${data[0].poster_path}`);
      }).catch(err => console.error(err));
      
  }

  setBackground(bgUrl){
    console.log('BG setting:', bgUrl);
    this.setState(document.body.style.backgroundImage = `"url('${bgUrl}')"`);
    // document.body.style.backgroundImage = "url('http://image.tmdb.org/t/p/w500/gBmrsugfWpiXRh13Vo3j0WW55qD.jpg')";
    // document.getElementById("body").style.backgroundImage = `"url('${bgUrl}')"`;
    // document.getElementById("body").style.backgroundImage = "url('http://image.tmdb.org/t/p/w500/gBmrsugfWpiXRh13Vo3j0WW55qD.jpg')";
  }

  setPoster(posterUrl){
    console.log('Poster Setting:', posterUrl);
    let poster = document.getElementById("movie-poster");
    poster.setAttribute('src', posterUrl);
    poster.setAttribute('width', 300);
    // poster.setAttribute('height', );
    console.log('state name: ', this.state.movieFileName);
    console.log('state path: ', this.state.moviePath);
  }

  movieInformation() {
    return <div id="movie-information">
        <img id="movie-poster" onClick={this.playVideo}></img>
    </div>
  }

  playVideo() {
    console.log('playing video');
    this.setState({isPlaying: true});
  }

  videoPlayer() {
    let url = this.state.moviePath;
    let height = 720; //9
    let width = (height * 16) / 9; //16
    return <div id="video-player">
      <video height={height} width={width} controls>
        <source url={url} type="video/mp4"></source>
      </video>
    </div>
  }

  render() { // JSX
    return <div id="body">
      <h1>Video Player</h1>
      <p>Choose a local video video file to play in web browser.</p>
      <p>to increase sucess of finding proper movie information ensure the movies file name is spelled correctly.</p>
      <p>Example: Jurassic World Fallen Kingdom (2018).mp4</p>

      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="file" value={this.state.value} onChange={this.handleChange} />
        </label>
      </form>

      {!this.state.isPlaying && this.movieInformation()}
      {this.state.isPlaying && this.videoPlayer()}
    </div>;
  }
}

const root = document.getElementById('root');
ReactDOM.render(<VideoPlayer />, root);