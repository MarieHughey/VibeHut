import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";

class SavePlaylist extends Component {
    constructor(props){
      super(props);
      this.state = {
          playlistName:'',
          songList:props.songList
      };
      
      this.keyPressUser = this.keyPressUser.bind(this);
    }


    handlePlaylistNameChange = (event) => {
        this.setState({ 
            playlistName: event.target.value 
        });
    }

    keyPressUser(e){
        var playlistName = this.state.playlistName;
        // console.log(this.state.songList);

        axios.get("/getPlaylists").then(response => {
            var id = 0; 
            const listItemsAll = response.data.map((d) => <li key={d.playlist_name}>{d.playlist_name} </li>);
            console.log(listItemsAll.length);
            id = listItemsAll.length + 1;
        
            console.log("name: " + playlistName);

            // add to playlist 
            axios.post("/addPlaylist", {
                playlist_name: playlistName,
                playlist_id: id,
                user_id: localStorage.getItem('currId')
            }).then(response => {
                console.log("added playlist");
            });

            // add songs to playlist 
            let songIds = [];
            var songItems = this.state.songList;
            for (let i = 0; i < songItems.length; i++) {
                songIds.push(songItems[i].key);
            }


            axios.post("/addPlaylistSongs", {
                playlist_id: id,
                songIdList: songIds
            }).then(response => {
                console.log("added playlist song");
                window.location.href = ROUTES.GENERATE_PLAYLIST;
            });

        });
        
        
        
    }

    
    render(){
    
      
      return (
       
        <div>
        <input
          name="playlistName"
          type="text"
          placeholder="Enter the playlist name..."
          style={{width: "300px"}}
          value={this.state.songTitle}
          onChange={this.handlePlaylistNameChange}
        />

        <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
            Save Playlist!
        </button>

        <br></br>
        <br></br>


        <div id="errorMessage"></div>

        </div>
      )}
} export default SavePlaylist;