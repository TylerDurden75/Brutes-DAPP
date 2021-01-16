import React from 'react';
import {Switch, Route} from 'react-router-dom';

//Components
import Brutes from './components/MainView/Brutes/Brutes';
import Gears from './components/MainView/Gears/Gears';
import Section from './components/MainView/Brutes/Section/Section';
import Marketplace from './components/MainView/Marketplace/Marketplace';
import Account from './components/MainView/Account/Account';
import Home from './components/MainView/Home/Home';

const Routes = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/brutes' component={Brutes}/>
            <Route exact path='/brutes/:section' component={Section}/>
            <Route exact path='/gears' component={Gears}/>
            <Route exact path='/marketplace' component={Marketplace}/>
            <Route exact path='/account' component={Account}/>
        </Switch>
    )
}

export default Routes;
