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
      // are we searching for a video?
      isLoading: false,
      // have we switched from viewing the poster to viewing the movie?
      isPlaying: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.fetchMovieInfo = this.fetchMovieInfo.bind(this);

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

    this.fetchMovieInfo(movieName[0]);
  }

  fetchMovieInfo(movieName) {
    // reset the state of everything when starting a new search.
    this.setState({
      isError: false,
      isLoading: true,
      posterUrl: undefined,
    });

    const api_url = 'http://mhzsys.net:21010/api'; // remote
    //const api_url = 'http://192.168.1.10:3000/api'; //local
    const images_uri = 'http://image.tmdb.org/t/p'
    const img_size = '/w300'

    return $.getJSON(`${api_url}/movies/${movieName}`).then(data => {
      console.log(data[0], 'got search results');
      const posterUrl = `${images_uri}/${img_size}${data[0].poster_path}`;
      this.setState({
        posterUrl,
        isError: false,
        isLoading: false,
      })
    }).catch(err => {
      console.error(err)
      this.setState({
        isError: true,
        isLoading: false,
      });
    });
      
  }

  movieInformation() {
    return <div id="movie-information">
      {this.state.isLoading && <p>Loading poster...</p>}
      {!this.state.isLoading && this.state.isError && <p>Couldn't find movie poster.</p>}
      {!this.state.isLoading && this.state.posterUrl &&
        <img id="movie-poster" onClick={this.playVideo} src={this.state.posterUrl} />
      }
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