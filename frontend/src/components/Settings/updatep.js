import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";
  

class UpdateP extends Component {
    constructor(props){
      super(props);
      this.state = {
          oldpassword:'',
          newpassword:'',
          passworderr:''
      };
      
      this.keyPressUser = this.keyPressUser.bind(this);
    }

    handleOldPasswordChange = (event) => {
        this.setState({ 
            oldpassword: event.target.value 
        });
    }

    handleNewPasswordChange = (event) => {
        this.setState({ 
            newpassword: event.target.value 
        });
    }

    keyPressUser(e){
        var oldpassword = this.state.oldpassword;
        var newpassword= this.state.newpassword;

        this.setState({
            oldpassword:'',
            newpassword:'',
            passworderr:''
        });

        console.log("oldpassword: " + oldpassword);
        console.log("newpassword: " + newpassword);

        // make sure password is at least 8 characters and matches confirm
        if (newpassword.length < 8) {
            this.setState({
                passworderr:"New Password must be at least 8 characters."
            });
        }

        // check if the old password is correct
        axios.get("/CheckPassword", {params: {id: localStorage.getItem('currId')}}).then(response => {
            var listItems = response.data[0].password;
            console.log(listItems);
            if (listItems == oldpassword){
                //update the password from the database
                axios.post("/UpdatePassword", { id: localStorage.getItem('currId'), password: newpassword}).then(response => {
                    console.log("password updated");
        
                    window.location.href = ROUTES.USERDASHBOARD;
                });
            }else{
                this.setState({
                    passworderr:"The old password does not match."
                });
            }
        
    });
    

    }

    
    render(){
      
      return (
       
        <div>

        <input
          name="oldpassword"
          type="password"
          placeholder="Enter old password..."
          style={{width: "300px"}}
          value={this.state.oldpassword}
          onChange={this.handleOldPasswordChange}
        />

        <input
          name="newpassword"
          type="password"
          placeholder="Enter new password..."
          style={{width: "300px"}}
          value={this.state.newpassword}
          onChange={this.handleNewPasswordChange}
        />

        <br></br>

        <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
            Update!
        </button>

        <br></br>

        <p className="text-danger">{this.state.passworderr}</p>

        <br></br>
        <br></br>

        <div id="errorMessage"></div>

        </div>
      )}
  } export default UpdateP;