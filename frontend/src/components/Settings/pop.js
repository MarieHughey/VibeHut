import React, { Component } from 'react';
//import Popup from "reactjs-popup";
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";

const MODEL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: '50px',
    zIndex: 1000

}

const OVERLAY_STYLES = {
    position: 'fixed',
    top:0,
    left: 0,
    right:0,
    bottom:0,
    backgroundColor: '(rgba(0,0,0,0.7)',
    zIndex: 1000
}

class Pop extends Component{
    handleClick = () => {
        this.props.toggle();

        
    };

    keyPressUser(e){
        axios.post("/DeleteAccount", { id: localStorage.getItem('currId')}).then(response => {
            axios.post("/DeleteAccountBooks", { id: localStorage.getItem('currId')}).then(response => {
                console.log("favebooks deleted");
            });
            axios.post("/DeleteAccountMovies", { id: localStorage.getItem('currId')}).then(response => {
                console.log("favemovies deleted");
            });
            axios.post("/DeleteAccountPlaylistSongs", { id: localStorage.getItem('currId')}).then(response => {
                console.log("playlistsongs deleted");
            });
            axios.post("/DeleteAccountSongs", { id: localStorage.getItem('currId')}).then(response => {
                console.log("playlists deleted");
            });
        
            console.log("account deleted");
            localStorage.setItem('currUser', "");
            localStorage.setItem('currId', "");
            window.location.href = ROUTES.LANDING;
        });
    }



    render(){
        return(
            <>
            <div style={OVERLAY_STYLES} />
            <div className="modal" style={MODEL_STYLES}>
                <div className="modal_content">
                    <span className="close" onClick={this.handleClick}>&times;    </span>
                    <p>Are you sure you want to delete this account? You will not be able to retrieve this account after deleting it.</p>
                    <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
                        Yes
                    </button>
                </div>
            </div>
            </>
            /*<Popup trigger={<button> Trigger</button>} position="right center">
            <div>Popup content here !!</div>
            </Popup>*/
    )}
} export default Pop;