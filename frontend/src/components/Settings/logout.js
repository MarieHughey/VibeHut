import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";
  

class Logout extends Component {

    keyPressUser(e){
        

            localStorage.setItem('currUser', "");
            localStorage.setItem('currId', "");

            // and then also route to the dashboard
            window.location.href = ROUTES.LOGIN;
    
    }

    
    render(){
      
      return (
       
        <div>

        <br></br>

        <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
            Logout
        </button>

        <br></br>


        <br></br>
        <br></br>

        </div>
      )}
  } export default Logout;