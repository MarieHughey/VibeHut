import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";
  

class CreateAccountForm extends Component {
    constructor(props){
      super(props);
      this.state = {
          username:'',
          email:'',
          password:'',
          passwordconfirm:'',
          passworderr:'',
          emailerr:'',
          usernameerr:''
      };
      
      this.keyPressUser = this.keyPressUser.bind(this);
    }


    handleUsernameChange = (event) => {
        this.setState({ 
            username: event.target.value 
        });
    }

    handleEmailChange = (event) => {
        this.setState({ 
            email: event.target.value 
        });
    }

    handlePasswordChange = (event) => {
        this.setState({ 
            password: event.target.value 
        });
    }

    handlePasswordConfirmChange = (event) => {
        this.setState({ 
            passwordconfirm: event.target.value 
        });
    }

    keyPressUser(e){
        var username = this.state.username;
        var email = this.state.email;
        var password = this.state.password;
        var passwordconfirm = this.state.passwordconfirm;

        this.setState({
            password:'',
            username:'',
            passwordconfirm:'',
            email:'',
            passworderr:'',
            emailerr:'',
            usernameerr:''
        });

        console.log("username: " + username);
        console.log("email: " + email);
        console.log("password: " + password);
        console.log("passwordconfirm: " + passwordconfirm);

        // make sure password is at least 8 characters and matches confirm
        if (password.length < 8) {
            this.setState({
                passworderr:"Password must be at least 8 characters."
            });
        }
        else if (password != passwordconfirm) {
            this.setState({
                passworderr:"Passwords do not match."
            });
        }

        // potential future valid email check but right now i dont care lol

        // make sure username is unique
        // check if there is a user with that username
        // if empty then valid
        axios.get("/checkUserExists", { params: {username: username}}).then(response => {
            const listItems = response.data.map((d) => <li key={d.username}>{d.username}</li>);
            console.log(listItems.length);

            if (listItems.length == 0) {
                // we passed all checks so we can add the user here
                // first get the amount of users so we can check the length and give user id
                axios.get("/getUsers").then(response => {
                    const listItemsAll = response.data.map((d) => <li key={d.username}>{d.username}</li>);
                    console.log(listItemsAll.length);
                    var newid = listItemsAll.length + 1;

                    // now we can add it
                    axios.post("/createAccount", {
                        username: username,
                        email: email,
                        password: password,
                        userId: newid
                    }).then(response => {
                        console.log("added user");

                        // then set global variable of logged in user
                        localStorage.setItem('currUser', username);
                        localStorage.setItem('currId', newid);

                        // and then also route to the dashboard
                        window.location.href = ROUTES.USERDASHBOARD;
                    });
                });
            }
            else {
                this.setState({
                    usernameerr:"This username is not available."
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
          name="email"
          type="text"
          placeholder="Enter your email..."
          style={{width: "300px"}}
          value={this.state.email}
          onChange={this.handleEmailChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Enter a password..."
          style={{width: "300px"}}
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />

        <input
          name="passwordconfirm"
          type="password"
          placeholder="Confirm password..."
          style={{width: "300px"}}
          value={this.state.passwordconfirm}
          onChange={this.handlePasswordConfirmChange}
        />

        <br></br>

        <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
            Create Account!
        </button>

        <p className="text-danger">{this.state.passworderr}</p>
        <p className="text-danger">{this.state.emailerr}</p>
        <p className="text-danger">{this.state.usernameerr}</p>

        <br></br>
        <br></br>

        <div id="errorMessage"></div>

        </div>
      )}
  } export default CreateAccountForm;