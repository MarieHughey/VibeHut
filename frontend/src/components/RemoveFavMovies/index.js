import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import RemoveMovie from './removemovie';

const removefavmovies = () => {
    console.log("Testing if I reached here!");
    return (  
    <div style={{marginLeft: '300px' }}>
    <div style={{ color: '#1d211f' }} >

    <RemoveMovie></RemoveMovie>


    <br></br>
    <br></br>
    </div>
    </div>
    );
  }

  export default removefavmovies;