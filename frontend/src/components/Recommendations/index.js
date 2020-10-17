import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AppIcon from '../../images/recommend-logo.png';

const recommendations = () => {

    return (  
    <div style={{marginLeft:'300px'}}>
        <br></br>
        <br></br>
        <img src={AppIcon} alt="recommendicon"/>
        <br></br>

        <h1>Get Recommendations</h1>
        <br></br>
        <p>here there will be a search bars users can type a movie or book into</p>
        <p>then use mysql database to output query of similar titles for recommendations</p>
       
    </div>
    );
  }
  
  export default recommendations;