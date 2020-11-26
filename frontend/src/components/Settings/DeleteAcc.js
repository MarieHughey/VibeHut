import PopUp from './pop';
import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";

const BUTTON ={
    position: 'relative',
    zIndex:1
}

class DeleteAcc extends Component {
    state = {
        seen: false
    };

    togglePop = () => {
        this.setState({
            seen: ! this.state.seen
        });
    };

    /*keyPressUser(e){
        this.setState({
            seen: ! this.state.seen
        });
    }*/

    render(){
      
        return (
         
            <div style = {BUTTON}>
            <div className="btn" onClick={this.togglePop}>
              <button>Delete Account</button>
            </div>
            {this.state.seen ? <PopUp toggle={this.togglePop} /> : null}
           </div>
        )}

    

} export default DeleteAcc;