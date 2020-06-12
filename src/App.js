import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Home from './components/pages/Home';
import Navbar from './components/layouts/Navbar';
import Profile from './components/pages/Profile';
import PostArticle from './components/Posts/PostArticle';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import EditProfile from './components/layouts/EditProfile';

import AuthState from './context/auth/authState';
import ArticleState from './context/Articles/articleState';

const App = () => {
  return (
    <AuthState>
      <ArticleState>
        <Router>
          <div className='App'>
            <div className='header'>
              <Navbar />
            </div>
            <div className='body'>
              <Switch>
                <Route
                  exact
                  path='/user/profile/edit'
                  component={EditProfile}
                />
                <Route exact path='/user' component={Profile} />
                <Route exact path='/form/article' component={PostArticle} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/' component={Home} />
              </Switch>
            </div>
          </div>
        </Router>
      </ArticleState>
    </AuthState>
  );
};

export default App;
