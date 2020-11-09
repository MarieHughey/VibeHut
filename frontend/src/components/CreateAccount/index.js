import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppIcon from '../../images/createaccount-logo.png';
import * as ROUTES from '../../constants/routes';
import CreateAccountForm from './createaccountform.js';

const createaccount = () => {

    return (  
    <div style={{marginLeft: '300px' }}>
    <div style={{ color: '#1d211f' }} >

    <img src={AppIcon} alt="createaccounticon"/>

    <h1>Create VibeHut Account!</h1>

    <br></br>
    <br></br>

    <CreateAccountForm />

    <br></br>
    <br></br>
    <br></br>

    </div>
    </div>
    );
  }

  export default createaccount;