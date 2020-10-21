import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppIcon from '../../images/generate-logo.png';
import MakeSearch from './search';

const generateplaylist = () => {

    return (  
    
    <div style={{marginLeft:'300px'}}>
        <br></br>
        <br></br>
        <img src={AppIcon} alt="generateicon"/>
        <br></br>

        <h1>Generate Playlist</h1>
        <br></br>
        <MakeSearch/>
       
    </div>
    );
  }
  
  export default generateplaylist;