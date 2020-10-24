import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppIcon from '../../images/recommend-logo.png';
import MakeSearch from './search.js';

const recommendations = () => {

    return (  
    <div style={{marginLeft:'300px'}}>
        <br></br>
        <br></br>
        <img src={AppIcon} alt="recommendicon"/>
        <br></br>

        <h1>Get Recommendations</h1>
        <br></br>
        <MakeSearch/>
        <br></br>
        <br></br>
       
    </div>
    );
  }
  
  export default recommendations;