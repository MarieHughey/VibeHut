import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";
  

class LoginForm extends Component {
    constructor(props){
      super(props);
      this.state = {
          username:'',
          password:'',
          loginerr:''
      };
      
      this.keyPressUser = this.keyPressUser.bind(this);
    }


    handleUsernameChange = (event) => {
        this.setState({ 
            username: event.target.value 
        });
    }

    handlePasswordChange = (event) => {
        this.setState({ 
            password: event.target.value 
        });
    }

    keyPressUser(e){
        var username = this.state.username;
        var password = this.state.password;

        console.log("username: " + username);
        console.log("password: " + password);

        this.setState({
            username:'',
            password:'',
            loginerr:''
        });

        // do login and if we get a match then we good
        axios.get("/login", { params: {username: username, password: password}}).then(response => {
            const listItems = response.data.map((d) => <li key={d.userId}>{d.userId}</li>);
            console.log(listItems.length);

            if (listItems.length == 1) {
                // we got a correct login
                var userId = response.data[0].userId;

                // set global variables for login
                localStorage.setItem('currUser', username);
                localStorage.setItem('currId', userId);

                console.log(localStorage.getItem('currUser'));
                console.log(localStorage.getItem('currId'));

                // go to dashboard
                window.location.href = ROUTES.USERDASHBOARD;
            }
            else {
                this.setState({
                    loginerr:"Username and password combination does not exist."
                });
            }
        });
    }

    
    render(){
      
      return (
       
        <div>
        <input
          name="username"
          type="text"
          placeholder="Enter your username..."
          style={{width: "300px"}}
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Enter a password..."
          style={{width: "300px"}}
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />


        <br></br>

        <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
            Login!
        </button>

        <br></br>
        <p className="text-danger">{this.state.loginerr}</p>
        <br></br>

        <div id="errorMessage"></div>

        </div>
      )}
  } export default LoginForm;