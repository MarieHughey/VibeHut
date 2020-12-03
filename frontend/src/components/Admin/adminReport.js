import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import axios from "axios";
import { Link, withRouter } from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:5000";

class AdminReport extends Component {
    constructor(props){
      super(props);
      this.state = {
          showReport: false,
          playlistTable: null,
          favBooksTable: null,
          favMoviesTable: null
      };
      
    }

    componentDidMount() {
        axios.get("/getNumPlaylistsForAllUser").then(response => {
            var listItemsAll = response.data;
            this.setState({
                playlistTable: listItemsAll,
            });
        });
        
        axios.get("/getNumFavBooks").then(response => {
            var listItemsAll = response.data;
            this.setState({
                favBooksTable: listItemsAll,
            });
        });
        
        axios.get("/getNumFavMovies").then(response => {
            var listItemsAll = response.data;
            this.setState({
                favMoviesTable: listItemsAll,
            });
        });
    
    };

    hideReport = (event) => {
        this.setState({
            showReport: false
        });
    }

    showReport = (event) => {
        this.setState({
            showReport:true
        });
    }

    reportHeaders(type) {
        switch (type){
            case 'numPlaylist':
                return [
                    <th>User Id</th>,
                    <th>Username</th>,
                    <th>Number of Playlists</th>
                ];
            case 'numFavBooks':
                return [
                    <th>User Id</th>,
                    <th>Username</th>,
                    <th>Number of Favorite Books</th>
                ];
            case 'numFavMovies':
                return [
                    <th>User Id    </th>,
                    <th>Username      </th>,
                    <th>Number of Favorite Movies</th>
                ];
        }

    }
    
    reportContent(type) {
        switch (type){
            case 'numPlaylist':
                return this.state.playlistTable.map((entry, index) => {
                    const { user_id, username, numPlaylists } = entry //destructuring
                    return (
                       <tr key={user_id}>
                          <td>{user_id}</td>
                          <td>{username}</td>
                          <td>{numPlaylists}</td>
                       </tr>
                    )
                })
            case 'numFavBooks':
                return this.state.favBooksTable.map((entry, index) => {
                    const { user_id, username, numFavBooks } = entry //destructuring
                    return (
                       <tr key={user_id}>
                          <td>{user_id}</td>
                          <td>{username}</td>
                          <td>{numFavBooks}</td>
                       </tr>
                    )
                })
            case 'numFavMovies':
                return this.state.favMoviesTable.map((entry, index) => {
                    const { user_id, username, numFavMovies } = entry //destructuring
                    return (
                       <tr key={user_id}>
                          <td>{user_id}</td>
                          <td>{username}</td>
                          <td>{numFavMovies}</td>
                       </tr>
                    )
                })
        }
        
    }

    
    render(){

    let report;
    if (this.state.showReport) {
        report = <div>
                <table id='reportP'>
                    <thead>
                        <tr>
                            {this.reportHeaders('numPlaylist')}
                        </tr>
                    </thead>
                    <tbody>
                        {this.reportContent('numPlaylist')}
                    </tbody>
                </table>
                <br></br>
                <table id='reportB'>
                    <thead>
                        <tr>
                            {this.reportHeaders('numFavBooks')}
                        </tr>
                    </thead>
                    <tbody>
                        {this.reportContent('numFavBooks')}
                    </tbody>
                </table>
                <br></br>
                <table id='reportM'>
                    <thead>
                        <tr>
                            {this.reportHeaders('numFavMovies')}
                        </tr>
                    </thead>
                    <tbody>
                        {this.reportContent('numFavMovies')}
                    </tbody>
                </table>
                </div>
                ; 
    } else {
        report = null;
    }
      
    return (
       
        <div>

        <button color="black" onClick={() => this.showReport()} id='show' size="small">
            Show Report
        </button>
        <button color="black" onClick={() => this.hideReport()} id='hide' size="small">
            Hide Report
        </button>

        {report}

        <br></br>
        <br></br>
        </div>
    )}
} export default AdminReport;