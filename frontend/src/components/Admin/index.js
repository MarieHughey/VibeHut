import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppIcon from '../../images/admin-logo.png';
import * as ROUTES from '../../constants/routes';
import AddMood from './addmood.js';
import DeleteMood from './deletemood.js';
import DeleteSong from './deletesong.js';

const admin = () => {

    return (  
    <div style={{marginLeft: '300px' }}>
    <div style={{ color: '#1d211f' }} >

    <img src={AppIcon} alt="adminicon"/>

    <h1>Admin Abilities</h1>

    <br></br>

    <h4>Delete a Song!</h4>
    <DeleteSong/>
    <br></br>

    <h4>Delete a Mood!</h4>
    <DeleteMood/>
    <br></br>

    <h4>Add a Mood!</h4>
    <AddMood/>

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