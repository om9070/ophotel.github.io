import React from 'react'
import './App.css';
import Home from './Home';
import Navbar from './Navbar';
import Order from './Order';
import Service from './Service';
import Log from "./Log";
import Register from './Register';
import Payment from './Payment';
import Footer from './Footer';
import Error from './Error';

import { Route, Switch } from 'react-router-dom';
import orderpush from './Orderpush';
import Logout from "./Logout";


function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/order" component={Order} />
        <Route exact path="/log" component={Log} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/orderpush" component={orderpush} />
        <Route exact path="/logout" component={Logout} />

      </Switch>

      <Footer />
    </>
  );
}

export default App;
