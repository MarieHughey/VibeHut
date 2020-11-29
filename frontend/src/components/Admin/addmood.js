import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";
  

class AddMood extends Component {
    constructor(props){
      super(props);
      this.state = {
          moodName:'',
          moodErr:''
      };
      
      this.keyPressUser = this.keyPressUser.bind(this);
    }

    handleMoodNameChange = (event) => {
        this.setState({ 
            moodName: event.target.value 
        });
    }

    keyPressUser(e){
        var moodName= this.state.moodName;

        this.setState({
            moodName:'',
            moodErr:''
        });

        console.log("moodname: " + moodName);

        // make sure mood doesn't already exist
        
        axios.get("/checkMoodExists", { params: {moodname: moodName}}).then(response => {
            const listItems = response.data.map((d) => <li key={d.mood_name}>{d.mood_name}</li>);
            console.log(listItems.length);

            if (listItems.length>0) {
                this.setState({
                    moodErr:"Mood already exists."
                });
            }
            else {

                axios.get("/getMaxMoodId").then(response => {
                    var listItemsAll = response.data[0].moodId;
                    console.log(listItemsAll);
                    var newid = listItemsAll + 1;

                    // now we can add it
                    axios.post("/addMood", {
                        moodname: moodName,
                        moodid: newid
                    }).then(response => {
                        console.log("added user");

                        // show that mood was added
                        this.setState({
                            moodErr:"Mood successfully added!"
                        });
                    });
                });
            }
        })
    

        
    };

    
    render(){
      
      return (
       
        <div>

        <input
          name="moodname"
          type="text"
          placeholder="Enter mood name to add..."
          style={{width: "300px"}}
          value={this.state.moodName}
          onChange={this.handleMoodNameChange}
        />

        <br></br>

        <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
            Add Mood!
        </button>

        <br></br>

        <p className="text-danger">{this.state.moodErr}</p>

        <br></br>
        <br></br>

        <div id="errorMessage"></div>

        </div>
      )}
  } export default AddMood;