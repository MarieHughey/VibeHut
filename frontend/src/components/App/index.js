import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AddNew from '../AddNew';
import Landing from '../Landing';
import GeneratePlaylist from '../GeneratePlaylist'
import Recommendations from '../Recommendations'

const App = () => (
  <Router>
    <div>
    <Route exact path={ROUTES.LANDING} component={Landing} />
    <Route path={ROUTES.ADD_NEW} component={AddNew} />
    <Route path={ROUTES.GENERATE_PLAYLIST} component={GeneratePlaylist} />
    <Route path={ROUTES.RECOMMENDATIONS} component={Recommendations} />
    </div>
  </Router>
  
);

export default App;