import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppIcon from '../../images/admin-logo.png';
import * as ROUTES from '../../constants/routes';

const admin = () => {

    return (  
    <div style={{marginLeft: '300px' }}>
    <div style={{ color: '#1d211f' }} >

    <img src={AppIcon} alt="adminicon"/>

    <h1>Admin Abilities</h1>

    <br></br>

    <h4>CREATE DELETE SONG LINK HERE</h4>
    <br></br>

    <h4>CREATE DELETE MOVIE LINK HERE</h4>
    <br></br>

    <h4>CREATE DELETE BOOK LINK HERE</h4>
    <br></br>

    <h4>CREATE DELETE MOOD LINK HERE</h4>
    <br></br>

    <h4>CREATE ADD MOOD LINK HERE</h4>

    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>

    </div>
    </div>
    );
  }

  export default admin;