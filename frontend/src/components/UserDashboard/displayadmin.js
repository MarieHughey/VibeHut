import React, { Component } from "react";
import axios from "axios";
import * as ROUTES from '../../constants/routes';
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";

export default class DisplayAdmin extends Component {
    constructor() {
        super();
        this.state = {
            isAdmin:false
        };
    }

    componentDidMount() {
        console.log(localStorage.getItem("currId"));
        axios.get("/checkIfAdmin", { params: {id: localStorage.getItem('currId')}}).then(response => {
            const listItems = response.data.map((d) => <li key={d.userId}>{d.userId}</li>);
            console.log(listItems.length);

            if (listItems.length>0) {
                this.setState({
                    isAdmin:true
                });
            }
        })
    };

    render() {
        
        let admin='';

        if (this.state.isAdmin) {
            admin=<p><Link to={ROUTES.ADMIN}>Admin Privileges</Link></p>
        }


        return (
            <div>
                {admin}
                <br/>

            </div>
        );
    }
}