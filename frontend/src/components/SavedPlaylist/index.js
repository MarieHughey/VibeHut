import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import DisplayPlaylist from './displayPlaylist';
import EditPlaylist from './editPlaylist';
import AppIcon from '../../images/vibehut-logo.png';

const savedPlaylist = (props) => {

    console.log(localStorage.getItem('currUser'));
    console.log(localStorage.getItem('currId'));

    console.log(props.location.playlist_name);
     
    return (  
        <div style={{marginLeft:'300px'}}>
        <br></br>
        <br></br>
        <img src={AppIcon} alt="vibehut"/>
        <br></br>
        
        
        <h4>Playlist:</h4>
        <h1>{props.location.playlist_name}</h1>
    
        <br></br>
        <br></br>
        
        
        <DisplayPlaylist playlist_id={props.location.playlist_id}/>
        
        <EditPlaylist playlist_id={props.location.playlist_id}/> 

        
    
        <br></br>
        <br></br>
        <br></br>
        </div>
        );
  }

  export default savedPlaylist;