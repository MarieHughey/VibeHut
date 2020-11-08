import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppIcon from '../../images/login-logo.png';
import * as ROUTES from '../../constants/routes';

const landing = () => {

    return (  
    <div style={{marginLeft: '300px' }}>
    <div style={{ color: '#1d211f' }} >

    <img src={AppIcon} alt="loginicon"/>

    <h1>Login to Existing Account!</h1>

    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>

    <h2><Link to={ROUTES.USERDASHBOARD}>pretend it worked</Link></h2>

    </div>
    </div>
    );
  }

  export default landing;