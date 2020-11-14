import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SavePlaylist from './playlistForm';

const playlistform = (props) => {

    return (  
    <div style={{marginLeft: '300px' }}>
    <div style={{ color: '#1d211f' }} >


    <br></br>
    <br></br>

    <h2>Enter Playlist Info</h2>

    <SavePlaylist songList={props.location.songList}/>
    <br></br>

    </div>
    </div>
    );
  }

  export default playlistform;