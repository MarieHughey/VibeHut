import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";

function SavePlaylist(props) {
  const songs = props.songs;
  // console.log(props.songs);
  if (props.gotPlaylist) {
    const formLink = { 
      pathname: ROUTES.PLAYLISTFORM, 
      songList: songs
    };
    return <h2><Link to={formLink}>Save Playlist!</Link></h2>;
  }
  return null;
}

class MakeSearch extends Component {
    constructor(props){
      super(props);
      this.state = {
          searchString:'',
          matchedMovies:'',
          matchedMovieIds:'',
          matchedBooks:'',
          matchedBookIds:'',
          playlistSongs:'',
          playlistSongIds:'',
          gotPlaylist: false,
          didRequest: false
      };
      
      this.keyPressUser = this.keyPressUser.bind(this);
      this.movieItemPress = this.movieItemPress.bind(this);
      this.bookItemPress = this.bookItemPress.bind(this);
    }

    
    handleChange = (event) => {
        this.setState({ 
            searchString: event.target.value 
        });
    }

    movieItemPress(e){
        console.log("clicked movie: " + e.currentTarget.id);
        axios.get("/getPlaylistForMovie", { params: {movieId: e.currentTarget.id}}).then(response => {
          const listItems = response.data.map((d) => <li key={d.song_title}>{d.song_title} <i>by {d.artist} </i></li>);
          const songIds = response.data.map((d) => <li key={d.song_id}>{d.song_id}</li>);
          console.log(response.data[0]);
          this.setState({
                playlistSongs: listItems,
                playlistSongIds: songIds
          });
        });
        this.setState({
          gotPlaylist: true
        });
    }

    bookItemPress(e){
        console.log("clicked book: " + e.currentTarget.id);
        axios.get("/getPlaylistForBook", { params: {bookId: e.currentTarget.id}}).then(response => {
          const listItems = response.data.map((d) => <li key={d.song_title}>{d.song_title} <i>by {d.artist} </i></li>);
          const songIds = response.data.map((d) => <li key={d.song_id}>{d.song_id}</li>);
          this.setState({
                playlistSongs: listItems,
                playlistSongIds: songIds
          });
        });
        this.setState({
          gotPlaylist: true
        });
    }

    keyPressUser(e){
        var searchval = this.state.searchString;
        console.log("searching: " + searchval);
        this.setState({
          searchString: "",
          didRequest: true
        });


        // search the database for the book title
        axios.get("/getMatchingBooks", { params: {toMatch: searchval}}).then(response => {
          const listItems = response.data.map((d) => <li style={{listStyle: "none"}} key={d.book_title}>{d.book_title} <i>by {d.author} </i></li>);
          const bookIds = response.data.map((d) => <li key={d.book_id}>{d.book_id}</li>);
          this.setState({
              matchedBooks: listItems,
              matchedBookIds: bookIds
          });
        });

        // search the database for the movie title
        axios.get("/getMatchingMovies", { params: {toMatch: searchval}}).then(response => {
          const listItems = response.data.map((d) => <li style={{listStyle: "none"}} key={d.movie_title}>{d.movie_title} <i>     ({d.year_released})</i></li>);
          const movieIds = response.data.map((d) => <li key={d.movie_id}>{d.movie_id}</li>);
          this.setState({
              matchedMovies: listItems,
              matchedMovieIds: movieIds
          });
      });
    }
    
    render(){

      let movieresults;
      let bookresults;

      if (this.state.didRequest) {
        movieresults = <h4>Matching Movies:</h4>;
        bookresults = <h4>Matching Books:</h4>;
      }

      let playlistresults;
      
      if (this.state.gotPlaylist) {
        playlistresults = <h3>Playlist Results:</h3>
      }

      var movieButtons = [];
      var bookButtons = [];
      
      if (this.state.matchedMovieIds.length > 0) {
        for(let i = 0; i < this.state.matchedMovies.length; i++)
        {
            var movieid = this.state.matchedMovieIds[i].key;
            var button = <button onClick={this.movieItemPress} key={movieid} id={movieid}> {this.state.matchedMovies[i]}</button>
            movieButtons.push(button);
    
        }
      }

      
      if (this.state.matchedBookIds.length > 0) {
        for(let i = 0; i < this.state.matchedBooks.length; i++)
        {
            var bookid = this.state.matchedBookIds[i].key;
            var button = <button onClick={this.bookItemPress} key={bookid} id={bookid}> {this.state.matchedBooks[i]} </button>
            bookButtons.push(button);
        }
      }
      
      
      return (
       
        <div>
        <br></br>

        <input
          name="tag"
          type="text"
          placeholder="Search for a movie or book title..."
          style={{width: "300px"}}
          value={this.state.searchString}
          onChange={this.handleChange}
        />

        <br></br>
        <br></br>

        <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
            Search!
        </button>

        <br></br>
        <br></br>
        
        {movieresults}
        <p>{movieButtons}</p>

        {bookresults}
        <p>{bookButtons}</p>

        <br></br>

        {playlistresults}
        <p>{this.state.playlistSongs}</p>

        <h6>Don't see your favorite movie or book?</h6>
        <h6><Link to={ROUTES.MOVIEFORM}>Add movie here!</Link></h6>
        <h6><Link to={ROUTES.BOOKFORM}>Add book here!</Link></h6>

        <SavePlaylist songs={this.state.playlistSongIds} gotPlaylist={this.state.gotPlaylist}/>

        <div id="errorMessage"></div>

        </div>
      )}
  } export default MakeSearch;
