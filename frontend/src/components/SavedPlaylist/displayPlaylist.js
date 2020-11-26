import React, { Component } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000";

let playlistSongs = [];

// for each playlist can delete
// add play list at bottom

export default class DisplayPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistId:props.playlist_id,
            songs:"",
            songsId:"",
            haveSongs: false,
            songTitle:"", // for searching
            songSearchResult:"" // for search result
        };

        this.keyPressUser = this.keyPressUser.bind(this);
    }

    componentDidMount() {
        // playlist_id, song_id
        axios.get("/getSavedPlaylistSongs", 
                {params: {playlistId: this.state.playlistId}}
            ).then(response => {
                const idsList = response.data.map((d) => <li key={d.song_id}>{d.song_id}</li>);
                const titelsList = response.data.map((d) => <li key={d.playlist_id}>{d.playlist_id}</li>)

                const songData = response.data;
                // console.log(songData[0]);

                for(let i = 0; i < songData.length; i++) {
                    var song_title = songData[i].song_title;
                    var artist = songData[i].artist;
                    var song_id = songData[i].song_id;
                    playlistSongs.push(
                        <li key={song_title} > {song_title} by {artist}
                            <p className='delete'>
                                {/* <button key={song_id} onClick={event => this.songDelete(song_id)}>
                                    <span>Remove</span>
                                </button> */}
                                <button onClick={this.songDelete} key={this.state.playlistId} id={song_id} value={this.state.playlistId}> 
                                    <span>Remove</span>
                                </button>
                            </p>
                        </li>
                    );
                    
                }
                this.setState({
                    songs:titelsList,
                    songsId:idsList,
                    haveSongs: true,
                });
        });
    };

    songDelete(id) { 
        console.log("delete song: " + id.currentTarget.id);
        console.log(id.currentTarget.value);
        // delete doesnt work, using post instead
        axios.post("/deleteSongSavedPlaylist", {
            playlist_id: id.currentTarget.value, 
            song_id: id.currentTarget.id
        }).then(response => {
                console.log(response);
        });
        
    }

    songAdd(id) { 
        console.log("add song: " + id);
        axios.post("/addSongSavedplaylist", {
            playlist_id: this.state.playlistId,
            song_id: id
        }).then(response => {
            console.log(response);
        });
        
    }

    handleChange = (event) => {
        this.setState({ 
            songTitle: event.target.value 
        });
    }

    refresh = (e) => {
        playlistSongs = [];
        axios.get("/getSavedPlaylistSongs", 
                {params: {playlistId: this.state.playlistId}}
            ).then(response => {
                const idsList = response.data.map((d) => <li key={d.song_id}>{d.song_id}</li>);
                const titelsList = response.data.map((d) => <li key={d.playlist_id}>{d.playlist_id}</li>)
                
                const songData = response.data;
                for(let i = 0; i < songData.length; i++) {
                    var song_id = songData[i].song_id;
                    var song_title = songData[i].song_title;
                    var artist = songData[i].artist;
                    playlistSongs.push(
                        <li key={song_title} > {song_title} by {artist}
                            <p className='delete'>
                                <button onClick={this.songDelete} key={this.state.playlistId} id={song_id} value={this.state.playlistId}> 
                                    <span>Remove</span>
                                </button>
                            </p>
                        </li>
                    );
                    
                }
                this.setState({
                    songs:titelsList,
                    songsId:idsList,
                    haveSongs: true,
                });
        });

    }

    keyPressUser(e){
        var searchName = this.state.songTitle;
        console.log("searching: " + searchName);
        this.setState({
          searchString: "",
        });

        // get song and artist
        axios.get("/getSongsByName", { params: {songTitle: searchName}}).then(response => {
            const result = response.data.map((d) => 
                <li key={d.song_id}>
                    {d.song_title} 
                    <i> by {d.artist} </i> 
                    <p className='add'>
                        <button onClick={event => this.songAdd(d.song_id)}>
                            <span>Add song</span>
                        </button>
                    </p>
                </li>);
            this.setState({
                songSearchResult: result,
            });
        });
        
        // how to make user choose one from the result list?
    }

    render() {

        return (
            <div>
                
                <ul>{playlistSongs}</ul>
                

                <br/>
                <br/>
                <button color="black" onClick={() => this.refresh()} id='refresh' size="small">
                    Refresh
                </button>
                <br/>
                <h3>Add Song</h3>
                <input
                    name="search"
                    type="text"
                    placeholder="Search by song name..."
                    style={{width: "300px"}}
                    value={this.state.songTitle}
                    onChange={this.handleChange}
                />
                <ul>{this.state.songSearchResult}</ul>
                


                <button color="black" onClick={() => this.keyPressUser()} id='addSearch' size="small">
                    Add
                </button>
                
                

            </div>
        );
    }
}