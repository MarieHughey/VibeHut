import React, { Component } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

export default class RemoveMovie extends Component {
    constructor() {
        super();
        this.state = {
            favemovies: "",
            moviename: "",
            movieErr: ""
        };
    }

    handleChange = (event) => {
        this.setState({ 
            movieName: event.target.value 
        });
    }

    keyPressUser(e) {
        var deleteMovie = this.state.moviename;
        console.log("The movie that is going to be deleted is: " + deleteMovie);
        this.setState({
            moviename: ""
        });

        //Delete the movie from the users favorite movie database
        axios.get("/checkMovieExists", { params: {toMatch: deleteMovie}}).then(response => {
            const input = response.data.map((d) => <li key={d.movie_title}>{d.movie_title}<i>by {d.year_released}</i> </li>);

            if(input.length==0) {
                this.setState({
                    movieErr: "Movie does not exist."
                });
            }
            else {
                axios.post("/removefavemovies", {
                    movieName: deleteMovie
                }).then(response => {
                    console.log("Deleted from favorites");
                    this.setState({
                        movieErr: "Movie deleted from favorites."
                    });
                })
            }
          });
        
    }


    componentDidMount() {
        axios.get("/getFaveMovies", { params: { userid: localStorage.getItem("currId") } }).then(response => {
            const listItems = response.data.map((d) => <li key={d.movie_title}>{d.movie_title} <i>   ({d.year_released}) </i></li>);
            this.setState({
                favemovies: listItems
            });

        });



    };

    render() {
       return (
            <div>
                <h2>Favorite Movies: </h2>
                <p>{this.state.favemovies}</p>
                <h2>Enter the movie you want to delete</h2>
                <br></br>

                <input
                    name="tag"
                    type="text"
                    placeholder="Enter the movie name that you would like to delete"
                    style={{ width: "300px" }}
                    value={this.state.movieName}
                    onChange={this.handleChange}
                />
                <br></br>
                <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
                    Delete!
        </button>

                <br></br>
                <br />
            </div>
        );
    }
}