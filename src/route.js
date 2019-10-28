import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Classes from './Component/Classes';
import notFoundHandler from './Component/404';
import Predict from './Component/Predict';

const Routes = () => (
    <Router>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/classes' component={Classes} />
            <Route path='/predict' component={Predict} />
            <Route path='*' component={notFoundHandler} status={404} />
        </Switch>
    </Router>
)


export default Routes;