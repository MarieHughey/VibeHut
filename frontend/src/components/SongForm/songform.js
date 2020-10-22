import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";
import { Link, withRouter } from 'react-router-dom';

class AddSong extends Component {
    constructor(props){
      super(props);
      this.state = {
          searchString:''
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
          searchString: ""
        });

        // search the database for the title of the song
        axios.get("/getMatchingSongs", { params: {toMatch: searchval}}).then(response => {
            const listItems = response.data.map((d) => <li key={d.song_title}>{d.song_title} <i>by {d.artist} </i></li>);
            this.setState({
                matchedSongs: listItems
            });
        });
    }

    
    render(){
      
      return (
       
        <div>
        <br></br>
        <br></br>
        <br></br>

        <input
          name="tag"
          type="text"
          placeholder="Search for a song title..."
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
        <p>{this.state.matchedSongs}</p>

        <h6>Don't see your favorite song?</h6>
        <h6><Link to={ROUTES.SONGFORM}>Add it here!</Link></h6>

        <div id="errorMessage"></div>

        </div>
      )}
  } export default MakeSearchSong;