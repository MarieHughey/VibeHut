import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";
  

class MoodAssociations extends Component {
    constructor(props){
      super(props);
      this.state = {
          moodThreshold:'',
          movies:[],
          books:[],
          songs:[],
          maxmin: 0
      };
      
      this.keyPressUser = this.keyPressUser.bind(this);
    }

    handleMoodThresholdChange = (event) => {
        this.setState({ 
            moodThreshold: event.target.value 
        });
    }

    keyPressUser(e){
        var moodThreshold= this.state.moodThreshold;

        this.setState({
            moodThreshold:'',
            moodErr:''
        });

        console.log("moodthreshold: " + moodThreshold);
        
        if (moodThreshold == "max") {
            axios.get("/getMoviesWMaxMoods").then(response => {
                const listItems = response.data.map((d) => <li key={d.movie_title}>{d.movie_title}</li>);
                this.setState({
                    movies: listItems
                });
            });
    
            axios.get("/getBooksWMaxMoods").then(response => {
                const listItems = response.data.map((d) => <li key={d.book_title}>{d.book_title}</li>);
                this.setState({
                    books: listItems
                });
            });
    
            axios.get("/getSongsWMaxMoods").then(response => {
                const listItems = response.data.map((d) => <li key={d.song_title}>{d.song_title}</li>);
                this.setState({
                    songs: listItems
                });
            });

            this.setState({
                maxmin: 2
            })
    
        }
        
        else if (moodThreshold == "min") {
            axios.get("/getMoviesWMinMoods").then(response => {
                const listItems = response.data.map((d) => <li key={d.movie_title}>{d.movie_title}</li>);
                this.setState({
                    movies: listItems
                });
            });
    
            axios.get("/getBooksWMinMoods").then(response => {
                const listItems = response.data.map((d) => <li key={d.book_title}>{d.book_title}</li>);
                this.setState({
                    books: listItems
                });
            });
    
            axios.get("/getSongsWMinMoods").then(response => {
                const listItems = response.data.map((d) => <li key={d.song_title}>{d.song_title}</li>);
                this.setState({
                    songs: listItems
                });
            });

            this.setState({
                maxmin: 1
            })
        }

        else {
            this.setState({
                moodErr: "Please enter either 'max' or 'min'."
            })
        }

    };

    
    render(){

        let thresholddisplay;

        if (this.state.maxmin == 1) {
            thresholddisplay = <h6>Displaying Results With Min # of Associated Moods:</h6>
        }
        else if (this.state.maxmin == 2) {
            thresholddisplay = <h6>Displaying Results with Max # of Associated Moods:</h6>
        }

        let movietitle, booktitle, songtitle;

        if (this.state.maxmin > 0) {
            movietitle = <h6>Movies: </h6>
            booktitle = <h6>Books: </h6>
            songtitle = <h6>Songs: </h6>
        }
      
        return (
        
            <div>

            <p>see all movies, books, and songs that are associated with either the most or least moods</p>
            <input
            name="moodthreshold"
            type="text"
            placeholder="Enter 'max' or 'min' ..."
            style={{width: "300px"}}
            value={this.state.moodName}
            onChange={this.handleMoodThresholdChange}
            />

            <br></br>

            <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
                View Matching Data!
            </button>

            {thresholddisplay}
            
            {movietitle}
            {this.state.movies}

            {booktitle}
            {this.state.books}

            {songtitle}
            {this.state.songs}
            

            <br></br>

            <p className="text-danger">{this.state.moodErr}</p>

            <br></br>
            <br></br>

            <div id="errorMessage"></div>

            </div>
        )}
  } export default MoodAssociations;