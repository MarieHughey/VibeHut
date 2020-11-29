import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import RemoveBook from './removebook';

const removefavbooks = () => {
    console.log("Testing if I reached here!");
    return (  
    <div style={{marginLeft: '300px' }}>
    <div style={{ color: '#1d211f' }} >

    <RemoveBook></RemoveBook>


    <br></br>
    <br></br>

    </div>
    </div>
    );
  }

  export default removefavbooks;