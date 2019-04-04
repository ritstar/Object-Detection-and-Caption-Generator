import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './App';
import Classes from './Component/Classes';
import notFoundHandler from './Component/404';

const Routes = () => (
    <Switch>
        <Route exact path='/' component={App} />
        <Route exact path='/classes' component={Classes} />
        <Route component={notFoundHandler} />
    </Switch>
)


export default Routes;