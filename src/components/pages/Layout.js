import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import Navbar from '../layouts/Navbar';
import Profile from './Profile';
import PostArticle from '../Posts/PostArticle';
import Login from '../auth/Login';
import Register from '../auth/Register';

const Layout = () => {
  return (
    <Fragment>
      <div className='header'>
        <Navbar />
      </div>
      <div className='body'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/user' component={Profile} />
          <Route exact path='/form/article' component={PostArticle} />

          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </div>
    </Fragment>
  );
};

export default Layout;
