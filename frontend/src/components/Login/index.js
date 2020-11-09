import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppIcon from '../../images/login-logo.png';
import * as ROUTES from '../../constants/routes';
import LoginForm from './loginform.js';

const landing = () => {

    return (  
    <div style={{marginLeft: '300px' }}>
    <div style={{ color: '#1d211f' }} >

    <img src={AppIcon} alt="loginicon"/>

    <h1>Login to Existing Account!</h1>

    <br></br>
    <br></br>

    <LoginForm />

    <br></br>
    <br></br>
    <br></br>

    </div>
    </div>
    );
  }

  export default landing;