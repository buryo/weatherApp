import * as React from 'react';
import { Route, BrowserRouter as Router } from "react-router-dom";
import PageNotFound from './404';
import Weather from './WeatherApp';

const Routes: React.SFC = () => {
    return (
        <Router>
            <Route path='/' exact={true} component={Weather}/>
            <Route path='/404' component={PageNotFound}/>
        </Router>
    )
}

export default Routes;