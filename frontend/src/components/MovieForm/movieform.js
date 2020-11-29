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
  

class AddMovie extends Component {
    constructor(props){
      super(props);
      this.state = {
          movieTitle:'',
          producer:'',
          yearReleased:''
      };
      
      this.keyPressUser = this.keyPressUser.bind(this);
    }


    handleMovieTitleChange = (event) => {
        this.setState({ 
            movieTitle: event.target.value 
        });
    }

    handleProducerChange = (event) => {
        this.setState({ 
            producer: event.target.value 
        });
    }

    handleYearReleasedChange = (event) => {
        this.setState({ 
            yearReleased: event.target.value 
        });
    }

    keyPressUser(e){
        var movietitle = this.state.movieTitle;
        var pro = this.state.producer;
        var yearreleased = this.state.yearReleased;

        console.log("title: " + movietitle);
        console.log("album: " + pro);
        console.log("artist: " + yearreleased);
        console.log("checked moods: " + checkedMoods)

        // search the database for the title of the song
        var movieExists = false;
        axios.get("/checkMovieExists", { params: {movietitle: movietitle, producer: pro}} ).then(response => {
            const listItems = response.data.map((d) => <li key={d.movie_title}>{d.movie_title} <i>by {d.producer} </i></li>);
            console.log(listItems.length);
            if (listItems.length > 0) {
                console.log('movieexisted');
                movieExists = true;
                window.location.href = ROUTES.ADD_NEW_MOVIE;
                return;
            }

            // later maybe add something to tell the user the song was already there

            console.log(movieExists);

            // get the id to assign by looking at current length of songs
            var newid = 0;
            axios.get("/getMovies").then(response => {
                const listItemsAll = response.data.map((d) => <li key={d.movie_title}>{d.movie_title} <i>by {d.producer} </i></li>);
                console.log(listItemsAll.length);
                newid = listItemsAll.length + 1;

                // now add the song to the songs database
                axios.post("/addMovie", {
                    movietitle: movietitle,
                    producer: pro,
                    yearReleased: yearreleased,
                    movieid: newid
                }).then(response => {
                    console.log("added movie");
                });
                
                // get the mood ids for the mood names
                var moodIds = [];
                axios.get("/getMoodIds", { params: {moodnames: checkedMoods}}).then(response => {
                    for (let i = 0; i < checkedMoods.length; i++) {
                        moodIds.push(response.data[i].mood_id);
                    }
                    console.log(moodIds);
                    
                    // then add the song moods to the songmoods database
                    axios.post("/addMovieMoods", {
                        movieid: newid,
                        moodidlist: moodIds
                    }).then(response => {
                        console.log("added movie moods");
                        // go back to non-form page
                        window.location.href = ROUTES.USERDASHBOARD;
                    })
                });
                
            });
        });
    }

    
    render(){
      
      return (
       
        <div>
        <input
          name="movietitle"
          type="text"
          placeholder="Enter the movie title..."
          style={{width: "300px"}}
          value={this.state.movieTitle}
          onChange={this.handleMovieTitleChange}
        />
        <input
          name="producer"
          type="text"
          placeholder="Enter the producer's name..."
          style={{width: "300px"}}
          value={this.state.producer}
          onChange={this.handleProducerChange}
        />

        <input
          name="yearReleased"
          type="text"
          placeholder="Enter the year of release..."
          style={{width: "300px"}}
          value={this.state.yearReleased}
          onChange={this.handleYearReleasedChange}
        />

        <MoodCheckboxes/>
        <br></br>

        <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
            Add Movie!
        </button>

        <br></br>
        <br></br>

        <div id="errorMessage"></div>

        </div>
      )}
  } export default AddMovie;