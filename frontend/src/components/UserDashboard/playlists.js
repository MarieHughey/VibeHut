import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";

let userplaylists = [];

export default class Playlists extends Component {
    constructor() {
        super();
        this.state = {
            savedplaylists:"",
            savedplaylistids:"",
            gotstuff: false
        };
    }

    componentDidMount() {
        axios.get("/getPlaylistsForUser", {params: {userid: localStorage.getItem("currId")}}).then(response => {
            const listItems = response.data.map((d) => <li style={{listStyle: "none"}} key={d.playlist_name}>{d.playlist_name}</li>);
            const playlistIds = response.data.map((d) => <li key={d.playlist_id}>{d.playlist_id}</li>)

            for(let i = 0; i < listItems.length; i++)
            {
                var playlistid = playlistIds[i].key;
                //console.log(playlistid);
                // var button = <Link to={'/savedplaylist/' + playlistid}> 
                //         <button onClick={this.playlistpress} key={playlistid} id={playlistid}> {listItems[i]}</button></Link>
                const playlistLink = { 
                    pathname: '/savedplaylist/' + playlistid, 
                    playlist_name: listItems[i],
                    playlist_id: playlistid
                };
                var link = <h4><Link to={playlistLink}>{listItems[i]}</Link></h4>;
                userplaylists.push(link);
            }
            console.log(listItems);
            
            this.setState({
                savedplaylists: listItems,
                savedplaylistIds: playlistIds,
                gotstuff:true
            });
        });
    };

    playlistpress(e) {
        console.log("pressed playlist: " + e.currentTarget.id);
    }

    render() {

        return (
            <div>
                <h2>Saved Playlists: </h2>
                <p>{userplaylists}</p>
                <br/>

            </div>
        );
    }
}