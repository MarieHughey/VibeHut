import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppIcon from '../../images/generate-logo.png';

const generateplaylist = () => {

    return (  
    
    <div style={{marginLeft:'750px'}}>
        <br></br>
        <br></br>
        <img src={AppIcon} alt="generateicon"/>
        <br></br>

        <h1>Generate Playlist</h1>
        <br></br>
        <p>here we will have a place to search for book or movie</p>
        <p>then use mysql database to output query of matching song results</p>
       
    </div>
    );
  }
  
  export default generateplaylist;