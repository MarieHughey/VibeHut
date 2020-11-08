import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AddNewSong from '../AddNewSong';
import Landing from '../Landing';
import GeneratePlaylist from '../GeneratePlaylist';
import Recommendations from '../Recommendations';
import SongForm from '../SongForm';
import Login from '../Login';
import CreateAccount from '../CreateAccount';
import UserDashboard from '../UserDashboard';


const App = () => (
  <Router>
    <div>
    <Route exact path={ROUTES.LANDING} component={Landing} />
    <Route path={ROUTES.ADD_NEW_SONG} component={AddNewSong} />
    <Route path={ROUTES.GENERATE_PLAYLIST} component={GeneratePlaylist} />
    <Route path={ROUTES.RECOMMENDATIONS} component={Recommendations} />
    <Route path={ROUTES.SONGFORM} component={SongForm} />
    <Route path={ROUTES.LOGIN} component={Login} />
    <Route path={ROUTES.USERDASHBOARD} component={UserDashboard} />
    <Route path={ROUTES.CREATEACCOUNT} component={CreateAccount} /> 
    </div>
  </Router>
  
);

export default App;