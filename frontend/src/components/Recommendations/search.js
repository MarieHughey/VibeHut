import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

class MakeSearch extends Component {
    constructor(props){
      super(props);
      this.state = {
          searchString:'',
          matchedMovies:'',
          matchedMovieIds:'',
          matchedBooks:'',
          matchedBookIds:'',
          recommendedBooks:'',
          recommendedMovies:'',
          gotRecommended: false,
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
        axios.get("/getRecommendedBooksForMovie", { params: {movieId: e.currentTarget.id}}).then(response => {
          const listItems = response.data.map((d) => <li key={d.book_title}>{d.book_title} <i>by {d.author} </i></li>);
            this.setState({
                recommendedBooks: listItems
          });
        });
        axios.get("/getRecommendedMoviesForMovie", { params: {movieId: e.currentTarget.id}}).then(response => {
            const listItems = response.data.map((d) => <li key={d.movie_title}>{d.movie_title} <i>   ({d.year_released}) </i></li>);
              this.setState({
                  recommendedMovies: listItems
            });
          });
        this.setState({
          gotRecommended: true
        });
    }

    bookItemPress(e){
        console.log("clicked book: " + e.currentTarget.id);
        axios.get("/getRecommendedBooksForBook", { params: {bookId: e.currentTarget.id}}).then(response => {
            const listItems = response.data.map((d) => <li key={d.book_title}>{d.book_title} <i>by {d.author} </i></li>);
              this.setState({
                  recommendedBooks: listItems
            });
          });
          axios.get("/getRecommendedMoviesForBook", { params: {bookId: e.currentTarget.id}}).then(response => {
              const listItems = response.data.map((d) => <li key={d.movie_title}>{d.movie_title} <i>   ({d.year_released}) </i></li>);
                this.setState({
                    recommendedMovies: listItems
              });
            });
          this.setState({
            gotRecommended: true
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

      let recommendedbookresults;
      let recommendedmovieresults;
      
      if (this.state.gotRecommended) {
        recommendedbookresults = <h3>Book Recommendations:</h3>
        recommendedmovieresults = <h3>Movie Recommendations:</h3>
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

        {recommendedmovieresults}
        <p>{this.state.recommendedMovies}</p>

        {recommendedbookresults}
        <p>{this.state.recommendedBooks}</p>

        <div id="errorMessage"></div>

        </div>
      )}
  } export default MakeSearch;