import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";
  

class UpdateU extends Component {
    constructor(props){
      super(props);
      this.state = {
          username:''
      };

      this.keyPressUser = this.keyPressUser.bind(this);
    }

    handleUsernameChange = (event) => {
        this.setState({ 
            username: event.target.value 
        });
    }

    keyPressUser(e){
        var username= this.state.username;

        this.setState({
            username:''
        });

        console.log("username: " + username);

        // Update the username in the database
        axios.post("/UpdateUsername", { id: localStorage.getItem('currId'), username: username}).then(response => {
            console.log("username updated");
            window.location.href = ROUTES.USERDASHBOARD;
        });
    
    }

    
    render(){
      
      return (
       
        <div>

        <input
          name="username"
          type="username"
          placeholder="Enter your new username..."
          style={{width: "300px"}}
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />


        <br></br>

        <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
            Update!
        </button>

        <br></br>


        <br></br>
        <br></br>

        <div id="errorMessage"></div>

        </div>
      )}
  } export default UpdateU;