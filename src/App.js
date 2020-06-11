import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Layout from './components/pages/Layout';

import AuthState from './context/auth/authState';
import ArticleState from './context/Articles/articleState';

const App = () => {
  return (
    <AuthState>
      <ArticleState>
        <Router>
          <div className='App'>
            <Layout />
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </div>
        </Router>
      </ArticleState>
    </AuthState>
  );
};

export default App;
