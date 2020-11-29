import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";
  

class DeleteSong extends Component {
    constructor(props){
      super(props);
      this.state = {
          songname:'',
          songartist:'',
          songErr:'',
          songs:''
      };
      
      this.keyPressUser = this.keyPressUser.bind(this);
    }

    handleSongNameChange = (event) => {
        this.setState({ 
            songname: event.target.value 
        });
    }

    handleSongArtistChange = (event) => {
        this.setState({ 
            songartist: event.target.value 
        });
    }

    keyPressList(e){
        axios.get("/getSongs").then(response => {
            const listItems = response.data.map((d) => <li key={d.song_title}>{d.song_title} <i>by {d.artist} </i></li>);
            this.setState({
                songs: listItems
            });
        });
    }

    keyPressUser(e){
        var songname = this.state.songname;
        var songartist = this.state.songartist;
        
        this.setState({
            songname:'',
            songartist:'',
            songErr:''
        });

        console.log("songname: " + songname);

        // make sure song exists
        
        axios.get("/checkSongExists", { params: {songtitle: songname, artist: songartist}}).then(response => {
            const listItems = response.data.map((d) => <li key={d.song_title}>{d.song_title} <i>by {d.artist} </i></li>);
            console.log(listItems.length);

            if (listItems.length==0) {
                this.setState({
                    songErr:"Song does not exist."
                });
            }
            else {
                axios.get("/getSongId", { params: {songname: songname, songartist: songartist}}).then(response => {
                    var songid = response.data[0].song_id;
                    console.log(songid);

                    // now we can delete it 
                    axios.post("/deleteSong", {
                        id: songid
                    }).then(response => {
                        console.log("deleted song");

                        axios.post("/deleteFromPlaylists", {
                            id: songid
                        }).then(response => {
                            console.log("deleted from playlists");

                            axios.post("/deleteSongMoods", {
                                id: songid
                            }).then(response => {
                                console.log("deleted song moods");

                                // show that song was deleted
                                this.setState({
                                    songErr:"Song successfully deleted!"
                                });
                            })
                        })
                    });
                })
            }
        })
    

        
    };

    
    render(){
      
      return (
       
        <div>

        <button color="black" onClick={() => this.keyPressList()} id='search' size="small">
            List Existing Songs
        </button>
        <p>{this.state.songs}</p>

        <input
          name="songname"
          type="text"
          placeholder="Enter song name to delete..."
          style={{width: "300px"}}
          value={this.state.songname}
          onChange={this.handleSongNameChange}
        />

        <input
          name="songartist"
          type="text"
          placeholder="Enter the artist of the song to delete..."
          style={{width: "300px"}}
          value={this.state.songartist}
          onChange={this.handleSongArtistChange}
        />

        <br></br>
        
        <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
            Delete Song!
        </button>

        <br></br>

        <p className="text-danger">{this.state.songErr}</p>

        <br></br>
        <br></br>

        <div id="errorMessage"></div>

        </div>
      )}
  } export default DeleteSong;