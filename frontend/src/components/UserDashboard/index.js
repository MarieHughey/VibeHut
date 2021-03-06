import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppIcon from '../../images/vibehut-logo.png';
import * as ROUTES from '../../constants/routes';
import Faves from './faves.js';
import Playlists from './playlists.js';
import DisplayAdmin from './displayadmin.js';

const userdashboard = () => {

    console.log(localStorage.getItem('currUser'));
    console.log(localStorage.getItem('currId'));

    return (  
    <div style={{marginLeft: '300px' }}>
    <div style={{ color: '#1d211f' }} >

    <img src={AppIcon} alt="vibehuticon"/>

    <h2> Welcome {localStorage.getItem("currUser")}!</h2>
    <p><Link to={ROUTES.SETTINGS}>Account Settings</Link></p>
    <DisplayAdmin/>

    <br/>
    <br/>

    <h1>Create a Playlist!</h1>
    <h2><Link to={ROUTES.GENERATE_PLAYLIST}>generate vibes</Link></h2>
    <Playlists/>

    <br></br>

    <h1>Get Recommendations!</h1>
    <h2><Link to={ROUTES.RECOMMENDATIONS}>find me something</Link></h2>
    <Faves/>

    <h5>Want to remove one of your favorite movies or books?</h5>
    <p><Link to={ROUTES.REMOVE_FAV_MOVIES}>Remove Fave Movie</Link></p>
    <p><Link to={ROUTES.REMOVE_FAV_BOOKS}>Remove Fave Book</Link></p>

    <br></br>

    <p>Not seeing your favorite songs showing up in playlists? Help us out by adding them!</p>
    <p><Link to={ROUTES.ADD_NEW_SONG}>add song</Link></p>

    <br></br>
        
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>

    </div>
    </div>
    );
  }

  export default userdashboard;