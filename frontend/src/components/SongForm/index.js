import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AddSong from './songform';

const landing = () => {

    return (  
    <div style={{marginLeft: '300px' }}>
    <div style={{ color: '#1d211f' }} >


    <br></br>
    <br></br>

    <h2>Enter Song Info</h2>

    <AddSong/>
    <br></br>

    </div>
    </div>
    );
  }

  export default landing;