import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppIcon from '../../images/vibehut-logo.png';
import * as ROUTES from '../../constants/routes';
import UpdateP from './updatep';
import UpdateU from './updateu';
import Logout from './logout';
import AdminPass from './adminpass';

const settings = () => {

    console.log(localStorage.getItem('currUser'));
    console.log(localStorage.getItem('currId'));

    return (  
        <div style={{marginLeft: '300px' }}>
        <div style={{ color: '#1d211f' }} >
    
        <img src={AppIcon} alt="createaccounticon"/>
    
        <h1>Settings</h1>
    
        <br></br>
        <br></br>
        
        <h2>Change Username</h2>
        <UpdateU />
        <h2>Change Password</h2>
        <UpdateP />
        <Logout />

        <h4>Activate Admin Account</h4>
        <AdminPass/>
    
        <br></br>
        <br></br>
        <br></br>
    
        </div>
        </div>
        );
  }

  export default settings;