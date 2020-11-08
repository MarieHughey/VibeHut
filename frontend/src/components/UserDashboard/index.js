import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppIcon from '../../images/vibehut-logo.png';
import * as ROUTES from '../../constants/routes';

const userdashboard = () => {

    return (  
    <div style={{marginLeft: '300px' }}>
    <div style={{ color: '#1d211f' }} >

    <img src={AppIcon} alt="vibehuticon"/>

    <h1>Create a Playlist!</h1>
    <h2><Link to={ROUTES.GENERATE_PLAYLIST}>generate vibes</Link></h2>

    <br></br>

    <h1>Get Recommendations!</h1>
    <h2><Link to={ROUTES.RECOMMENDATIONS}>find me something</Link></h2>

    <br></br>

    <p>Don't see your favorite songs here? Help us out by adding them!</p>
    <p><Link to={ROUTES.ADD_NEW_SONG}>add song</Link></p>

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