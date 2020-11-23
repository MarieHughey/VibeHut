import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
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
          recommendedMovieIds:'',
          recommendedBookIds:'',
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
          const listItems = response.data.map((d) => <li style={{listStyle: "none"}} key={d.book_title}>{d.book_title} <i>by {d.author} </i></li>);
          const bookIds = response.data.map((d) => <li key={d.book_id}>{d.book_id}</li>);
          this.setState({
                recommendedBooks: listItems,
                recommendedBookIds: bookIds
          });
        });

        axios.get("/getRecommendedMoviesForMovie", { params: {movieId: e.currentTarget.id}}).then(response => {
            const listItems = response.data.map((d) => <li style={{listStyle: "none"}} key={d.movie_title}>{d.movie_title} <i>   ({d.year_released}) </i></li>);
            const movieIds = response.data.map((d) => <li key={d.movie_id}>{d.movie_id}</li>);
            this.setState({
                  recommendedMovies: listItems,
                  recommendedMovieIds: movieIds
            });
          });

        this.setState({
          gotRecommended: true
        });
    }

    faveMoviePress(e) {
      console.log("favorited movie: " + e.currentTarget.id);

      // add movie to favorites
      axios.post("/addFaveMovie", {
        movieid: e.currentTarget.id,
        userid: localStorage.getItem('currId')
      }).then(response => {
        console.log("added fave movie");
      });
    }

    faveBookPress(e) {
      console.log("favorited book: " + e.currentTarget.id);

      // add book to favorites
      axios.post("/addFaveBook", {
        bookid: e.currentTarget.id,
        userid: localStorage.getItem('currId')
      }).then(response => {
        console.log("added fave book");
      });
    }

    bookItemPress(e){
        console.log("clicked book: " + e.currentTarget.id);
        axios.get("/getRecommendedBooksForBook", { params: {bookId: e.currentTarget.id}}).then(response => {
            const listItems = response.data.map((d) => <li style={{listStyle: "none"}} key={d.book_title}>{d.book_title} <i>by {d.author} </i></li>);
            const bookIds = response.data.map((d) => <li key={d.book_id}>{d.book_id}</li>);
            this.setState({
                  recommendedBooks: listItems,
                  recommendedBookIds: bookIds
            });
        });

        axios.get("/getRecommendedMoviesForBook", { params: {bookId: e.currentTarget.id}}).then(response => {
            const listItems = response.data.map((d) => <li style={{listStyle: "none"}} key={d.movie_title}>{d.movie_title} <i>   ({d.year_released}) </i></li>);
            const movieIds = response.data.map((d) => <li key={d.movie_id}>{d.movie_id}</li>);
            this.setState({
                  recommendedMovies: listItems,
                  recommendedMovieIds: movieIds
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
        recommendedbookresults = <h3>Book Recommendations (Click to Add to Favorites!):</h3>
        recommendedmovieresults = <h3>Movie Recommendations (Click to Add to Favorites!):</h3>
      }

      var movieResultButtons = [];
      var bookResultButtons = [];

      if (this.state.recommendedMovieIds.length > 0) {
        console.log(this.state.recommendedMovieIds.length);
        for(let i = 0; i < this.state.recommendedMovies.length; i++)
        {
            var movieid = this.state.recommendedMovieIds[i].key;
            //console.log("rec:" + movieid);
            var button = <button onClick={this.faveMoviePress} key={movieid} id={movieid}> {this.state.recommendedMovies[i]}</button>
            movieResultButtons.push(button);
    
        }
      }

      if (this.state.recommendedBookIds.length > 0) {
        console.log(this.state.recommendedBookIds.length);
        for(let i = 0; i < this.state.recommendedBooks.length; i++)
        {
            var bookid = this.state.recommendedBookIds[i].key;
            //console.log("rec:" + bookid);
            var button = <button onClick={this.faveBookPress} key={bookid} id={bookid}> {this.state.recommendedBooks[i]}</button>
            bookResultButtons.push(button);
    
        }
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

        <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
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
        <p>{movieResultButtons}</p>

        {recommendedbookresults}
        <p>{bookResultButtons}</p>

        <h6>Don't see your favorite movie or book?</h6>
        <h6><Link to={ROUTES.MOVIEFORM}>Add movie here!</Link></h6>
        <h6><Link to={ROUTES.BOOKFORM}>Add book here!</Link></h6>

        <div id="errorMessage"></div>

        </div>
      )}
  } export default MakeSearch;