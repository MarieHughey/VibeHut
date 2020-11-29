import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";
  

class DeleteMood extends Component {
    constructor(props){
      super(props);
      this.state = {
          moodName:'',
          moodErr:'',
          moods:''
      };
      
      this.keyPressUser = this.keyPressUser.bind(this);
    }

    handleMoodNameChange = (event) => {
        this.setState({ 
            moodName: event.target.value 
        });
    }

    keyPressList(e){
        axios.get("/getMoods").then(response => {
            const listItems = response.data.map((d) => <li key={d.mood_name}>{d.mood_name}</li>);
            this.setState({
                moods: listItems
            });
        });
    }

    keyPressUser(e){
        var moodName= this.state.moodName;

        this.setState({
            moodName:'',
            moodErr:''
        });

        console.log("moodname: " + moodName);

        // make sure mood exists
        
        axios.get("/checkMoodExists", { params: {moodname: moodName}}).then(response => {
            const listItems = response.data.map((d) => <li key={d.mood_name}>{d.mood_name}</li>);
            console.log(listItems.length);

            if (listItems.length==0) {
                this.setState({
                    moodErr:"Mood does not exist."
                });
            }
            else {
                axios.get("/getMoodId", { params: {moodname: moodName}}).then(response => {
                    var moodid = response.data[0].mood_id;
                    console.log(moodid);

                    // now we can delete it
                    axios.post("/deleteMood", {
                        id: moodid
                    }).then(response => {
                        console.log("deleted mood");

                        axios.post("/deleteMoodMovies", {
                            id: moodid
                        }).then(response => {
                            console.log("deleted mood movies");

                            axios.post("/deleteMoodBooks", {
                                id: moodid
                            }).then(response => {
                                console.log("deleted mood books");

                                axios.post("/deleteMoodSongs", {
                                    id: moodid
                                }).then(response => {
                                    console.log("deleted mood songs");

                                    // show that mood was deleted
                                    this.setState({
                                        moodErr:"Mood successfully deleted!"
                                    });
                                })
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
            List Existing Moods
        </button>
        <p>{this.state.moods}</p>

        <input
          name="moodname"
          type="text"
          placeholder="Enter mood name to delete..."
          style={{width: "300px"}}
          value={this.state.moodName}
          onChange={this.handleMoodNameChange}
        />

        <br></br>
        
        <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
            Delete Mood!
        </button>

        <br></br>

        <p className="text-danger">{this.state.moodErr}</p>

        <br></br>
        <br></br>

        <div id="errorMessage"></div>

        </div>
      )}
  } export default DeleteMood;