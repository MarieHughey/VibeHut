import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppIcon from '../../images/addsong-logo.png';
import MakeSearchSong from './search';
import Songs from './songs';

const addnewsong = () => {

    return (
    <div style={{marginLeft:'300px'}}>
        <br></br>
        <br></br>
        <img src={AppIcon} alt="addsongicon"/>
        <br></br>

        <h1>Add New Song</h1>
        <br></br>
        <MakeSearchSong/>

        <Songs/>
       
    </div>
    );
  }
  
  export default addnewsong;