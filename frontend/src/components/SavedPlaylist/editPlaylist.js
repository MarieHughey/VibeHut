import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";
  

export default class EditPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist_id:props.playlist_id,
            editName:""
        };
    }

    deletePlaylist(e){
        // delete playlist
        
        axios.post("/deletePlaylist", {
            playlist_id: this.state.playlist_id
        }).then(response => { 
                console.log(response);
            }
        );

        // back to user dashboard
        window.location.href = ROUTES.USERDASHBOARD;
    
    }

    // add trigger to delete all playlist songs with that specific playlist id 

    // button , onlick show input box , update table , refresh page
    handleChange = (event) => {
        this.setState({ 
            editName: event.target.value 
        });
    }
    editPlaylistName = (event) => {
        axios.post("/updatePlaylistName", {
            playlist_id: this.state.playlist_id,
            name: this.state.editName
        }).then(response => {
            console.log(response);
        });
    }


    render(){
        
      
        return (
        
            <div>

            <br></br>

            <h3>Edit Playlist</h3>
            <input
                name="edit"
                type="text"
                placeholder="New playlist name..."
                style={{width: "300px"}}
                value={this.state.editName}
                onChange={this.handleChange}
            />
            <button color="black" onClick={() => this.editPlaylistName()} id='edit' size="small">
                Edit Name
            </button>

            
            <h3>Delete playlist ? This cannot be undone!</h3>
            <button color="black" onClick={() => this.deletePlaylist()} id='delete' size="small">
                Delete Playlist
            </button>

            <br></br>


            <br></br>
            <br></br>

            </div>
        )}
} 