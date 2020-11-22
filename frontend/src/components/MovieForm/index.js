import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AddMovie from './movieform';

const movieform = () => {

    return (  
    <div style={{marginLeft: '300px' }}>
    <div style={{ color: '#1d211f' }} >


    <br></br>
    <br></br>

    <h2>Enter Movie Info</h2>

    <AddMovie/>
    <br></br>

    </div>
    </div>
    );
  }

  export default movieform;
