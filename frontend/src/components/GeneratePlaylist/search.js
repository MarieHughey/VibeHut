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
          matchedBooks:'',
          didRequest: false
      };
      
      this.keyPressUser = this.keyPressUser.bind(this);
    }

    
    handleChange = (event) => {
        this.setState({ 
            searchString: event.target.value 
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
          const listItems = response.data.map((d) => <li key={d.book_title}>{d.book_title} <i>by {d.author} </i></li>);
          this.setState({
              matchedBooks: listItems
          });
        });

        // search the database for the movie title
        axios.get("/getMatchingMovies", { params: {toMatch: searchval}}).then(response => {
          const listItems = response.data.map((d) => <li key={d.movie_title}>{d.movie_title} <i>     ({d.year_released})</i></li>);
          this.setState({
              matchedMovies: listItems
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
        <p>{this.state.matchedMovies}</p>

        <br></br>
        <br></br>

        {bookresults}
        <p>{this.state.matchedBooks}</p>

        <div id="errorMessage"></div>

        </div>
      )}
  } export default MakeSearch;