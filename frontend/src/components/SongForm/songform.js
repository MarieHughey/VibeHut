import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";

class MoodCheckboxes extends React.Component {
    constructor (props){
      super ();
    }
    render (){
      return (
        <div>
          <TitleList title="Select Associated Tones/Moods:" />
          <MoodList />
        </div>
      );
    }
} 
  
let checkedMoods = [];
  
class Item extends React.Component {
    constructor (props){
        super ();

        this.state = {
        checked: false
        };

        this.handleClick = this.handleClick.bind(this);    
    }

    handleClick (e){
        this.setState({
        checked: !this.state.checked
        });
        if (!checkedMoods.includes(this.props.message)) {
            checkedMoods.push(this.props.message);
        }
        else {
            var indexToRemove = checkedMoods.indexOf(this.props.message);
            checkedMoods.splice(indexToRemove, 1);
        }
        console.log(checkedMoods);
    }


    render (){
        let text = this.props.message;
        return (
            <div className="row">
            <div className="col-md-12">
                <input type="checkbox" onClick={this.handleClick} />&nbsp;{text}
            </div>
            </div>
        );
    }
}

// here we need to get the moods from the database and list them
class MoodList extends React.Component {
    constructor() {
        super();
        this.state = {
            moods: ""
        };
    }

    componentDidMount() {
        axios.get("/getMoods").then(response => {
            const listItems = response.data.map((d) => <Item message={d.mood_name} key={d.mood_id}/>);
            this.setState({
                moods: listItems
            });
        });
    }

    renderMoods() {
        let items = this.state.moods.map(thing => thing);
        return (
            <h5>{items}</h5>
        );
    }

    render (){
        //console.log(this.state.moods.length);
        return this.state.moods.length ? this.renderMoods() : (
            <span>Loading moods...</span>
        )
    }

}

class TitleList extends React.Component {
    render (){
        return (
        <div className="listname">
            <p>{this.props.title}</p>
        </div>
        );
    }
}
  

class AddSong extends Component {
    constructor(props){
      super(props);
      this.state = {
          songTitle:'',
          artist:'',
          albumTitle:''
      };
      
      this.keyPressUser = this.keyPressUser.bind(this);
    }


    handleSongTitleChange = (event) => {
        this.setState({ 
            songTitle: event.target.value 
        });
    }

    handleArtistChange = (event) => {
        this.setState({ 
            artist: event.target.value 
        });
    }

    handleAlbumTitleChange = (event) => {
        this.setState({ 
            albumTitle: event.target.value 
        });
    }

    keyPressUser(e){
        var songtitle = this.state.songTitle;
        var albumtitle = this.state.albumTitle;
        var artist = this.state.artist;

        console.log("title: " + songtitle);
        console.log("album: " + albumtitle);
        console.log("artist: " + artist);
        console.log("checked moods: " + checkedMoods)

        // search the database for the title of the song
        var songExists = false;
        axios.get("/checkSongExists").then(response => {
            const listItems = response.data.map((d) => <li key={d.song_title}>{d.song_title} <i>by {d.artist} </i></li>);
            console.log(listItems.length);
            if (listItems.length == 0) {
                songExists = true;
                window.location.href = ROUTES.ADD_NEW_SONG;
                return;
            }

            // later maybe add something to tell the user the song was already there

            console.log(songExists);

            // get the id to assign by looking at current length of songs
            var newid = 0;
            axios.get("/getSongs").then(response => {
                const listItemsAll = response.data.map((d) => <li key={d.song_title}>{d.song_title} <i>by {d.artist} </i></li>);
                console.log(listItemsAll.length);
                newid = listItemsAll.length + 1;

                // now add the song to the songs database
                axios.post("/addSong", {
                    songtitle: songtitle,
                    artist: artist,
                    albumname: albumtitle,
                    songid: newid
                }).then(response => {
                    console.log("added song");
                });
                // get the mood ids for the mood names
                var moodIds = [];
                axios.get("/getMoodIds", { params: {moodnames: checkedMoods}}).then(response => {
                    for (let i = 0; i < checkedMoods.length; i++) {
                        moodIds.push(response.data[i].mood_id);
                    }
                    console.log(moodIds);
                    
                    // then add the song moods to the songmoods database
                    axios.post("/addSongMoods", {
                        songid: newid,
                        moodidlist: moodIds
                    }).then(response => {
                        console.log("added song moods");
                        // go back to non-form page
                        window.location.href = ROUTES.ADD_NEW_SONG;
                    })
                });
            });
        });
    }

    
    render(){
      
      return (
       
        <div>
        <input
          name="songtitle"
          type="text"
          placeholder="Enter the song title..."
          style={{width: "300px"}}
          value={this.state.songTitle}
          onChange={this.handleSongTitleChange}
        />
        <input
          name="artist"
          type="text"
          placeholder="Enter the artist's name..."
          style={{width: "300px"}}
          value={this.state.artist}
          onChange={this.handleArtistChange}
        />

        <input
          name="albumtitle"
          type="text"
          placeholder="Enter the album title..."
          style={{width: "300px"}}
          value={this.state.albumTitle}
          onChange={this.handleAlbumTitleChange}
        />

        <MoodCheckboxes/>
        <br></br>

        <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
            Add Song!
        </button>

        <br></br>
        <br></br>

        <div id="errorMessage"></div>

        </div>
      )}
  } export default AddSong;