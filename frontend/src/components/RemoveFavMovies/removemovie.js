import React, { Component } from "react";
import axios from "axios";
import * as ROUTES from '../../constants/routes';
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
            moviename: event.target.value 
        });
    }

    keyPressUser(e) {
        var deleteMovie = this.state.moviename;
        console.log("The movie that is going to be deleted is: " + deleteMovie);
        this.setState({
            moviename: ""
        });

        //Delete the movie from the users favorite movie database
        axios.get("/getMovieId", { params: {moviename: deleteMovie}}).then(response => {
            if (response.data.length== 0) {
                this.setState({
                    movieErr: "Movie does not exist.",
                    moviename: ""
                });
            }
            else {

                var movieid = response.data[0].movie_id;
                console.log(movieid);

                axios.post("/removefavemovie", {
                    movieid: movieid,
                    user_id: localStorage.getItem("currId")
                }).then(response => {
                    console.log("Deleted from favorites");
                    window.location.href = ROUTES.REMOVE_FAV_MOVIES;
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
                <h1>Delete Favorite Movies</h1>
                <br></br>
                <br></br>


                <h2>Favorite Movies: </h2>
                <p>{this.state.favemovies}</p>
                <br></br>
                <input
                    name="tag"
                    type="text"
                    placeholder="Enter the movie title to delete..."
                    style={{ width: "300px" }}
                    value={this.state.movieName}
                    onChange={this.handleChange}
                />
                <br></br>

                <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
                    Delete!
                </button>

                <p className="text-danger">{this.state.movieErr}</p>

                <br></br>
                <br />
            </div>
        );
    }
}