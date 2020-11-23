import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";
  

class AdminPass extends Component {
    constructor(props){
      super(props);
      this.state = {
          adminpassword:'',
          passworderr:''
      };
      
      this.keyPressUser = this.keyPressUser.bind(this);
    }

    handleAdminPasswordChange = (event) => {
        this.setState({ 
            adminpassword: event.target.value 
        });
    }

    keyPressUser(e){
        var adminpassword= this.state.adminpassword;

        this.setState({
            adminpassword:'',
            passworderr:''
        });

        console.log("adminpassword: " + adminpassword);

        // make sure password matches adminpass
        // lmao this is like super insecure but this isn't a security class hahahha
        if (adminpassword != "makemeadmin") {
            this.setState({
                passworderr:"Invalid Admin Password."
            });
        }
        else {
            axios.get("/checkIfAdmin", { params: {id: localStorage.getItem('currId')}}).then(response => {
                const listItems = response.data.map((d) => <li key={d.userId}>{d.userId}</li>);
                console.log(listItems.length);

                if (listItems.length>0) {
                    this.setState({
                        passworderr:"You are already an admin."
                    });
                }
                else {
                    axios.post("/makeAdmin", {id: localStorage.getItem('currId')}).then(response => {
                        console.log("admin privileges granted");
                        window.location.href = ROUTES.USERDASHBOARD;
                    });
                }
            })
        }

        
    };

    
    render(){
      
      return (
       
        <div>

        <input
          name="adminpassword"
          type="password"
          placeholder="Enter admin password..."
          style={{width: "300px"}}
          value={this.state.adminpassword}
          onChange={this.handleAdminPasswordChange}
        />

        <br></br>

        <button color="black" onClick={() => this.keyPressUser()} id='search' size="small">
            Grant Admin Privileges!
        </button>

        <br></br>

        <p className="text-danger">{this.state.passworderr}</p>

        <br></br>
        <br></br>

        <div id="errorMessage"></div>

        </div>
      )}
  } export default AdminPass;