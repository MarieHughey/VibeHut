import React, { Component } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

export default class Songs extends Component {
    constructor() {
        super();
        this.state = {
            songs: ""
        };
    }

    handleButtonClick = () => {
        axios.get("/getSongs").then(response => {
            const listItems = response.data.map((d) => <li key={d.song_title}>{d.song_title} <i>by {d.song_artist} </i></li>);
            this.setState({
                songs: listItems
            });
        });
    };

    render() {
        return (
            <div>
                <button onClick={this.handleButtonClick}>List Existing Songs</button>
                <p>{this.state.songs}</p>
            </div>
        );
    }
}