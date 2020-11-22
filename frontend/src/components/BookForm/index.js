import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AddBook from './bookform';

const bookform = () => {

    return (  
    <div style={{marginLeft: '300px' }}>
    <div style={{ color: '#1d211f' }} >


    <br></br>
    <br></br>

    <h2>Enter Book Info</h2>

    <AddBook/>
    <br></br>

    </div>
    </div>
    );
  }

  export default bookform;
