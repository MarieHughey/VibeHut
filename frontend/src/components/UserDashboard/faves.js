import React, { Component } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

export default class Faves extends Component {
    constructor() {
        super();
        this.state = {
            favebooks: "",
            favemovies: ""
        };
    }

    componentDidMount() {
        axios.get("/getFaveMovies", {params: {userid: localStorage.getItem("currId")}}).then(response => {
            const listItems = response.data.map((d) => <li key={d.movie_title}>{d.movie_title} <i>   ({d.year_released}) </i></li>);
            this.setState({
                favemovies: listItems
            });
        });

        axios.get("/getFaveBooks", {params: {userid: localStorage.getItem("currId")}}).then(response => {
            const listItems = response.data.map((d) => <li key={d.book_title}>{d.book_title} <i>by {d.author} </i></li>);
            this.setState({
                favebooks: listItems
            });
        })
    };

    render() {
        return (
            <div>
                <h2>Favorite Movies: </h2>
                <p>{this.state.favemovies}</p>

                <h2>Favorite Books: </h2>
                <p>{this.state.favebooks}</p>

                <br/>

            </div>
        );
    }
}