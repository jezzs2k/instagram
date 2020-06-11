import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
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
          </div>
        </Router>
      </ArticleState>
    </AuthState>
  );
};

export default App;
