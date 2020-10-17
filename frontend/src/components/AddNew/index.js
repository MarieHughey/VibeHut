import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppIcon from '../../images/addsong-logo.png';
import Songs from './songs';

const addnew = () => {

    return (
    <div style={{marginLeft:'300px'}}>
        <br></br>
        <br></br>
        <img src={AppIcon} alt="addsongicon"/>
        <br></br>

        <h1>Add New Song</h1>
        <br></br>
        <p>here users can add songs into the database</p>
        <p>there will be a form they can fill out with song info to add to the sql database</p>

        <Songs/>
       
    </div>
    );
  }
  
  export default addnew;