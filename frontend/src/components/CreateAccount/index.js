import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppIcon from '../../images/createaccount-logo.png';
import * as ROUTES from '../../constants/routes';

const createaccount = () => {

    return (  
    <div style={{marginLeft: '300px' }}>
    <div style={{ color: '#1d211f' }} >

    <img src={AppIcon} alt="createaccounticon"/>

    <h1>Create VibeHut Account!</h1>

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

  export default createaccount;