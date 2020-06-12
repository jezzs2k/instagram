import React, { useEffect, useContext } from 'react';
import { Skeleton } from 'antd';

import Articles from '../Posts/Arcitles';
import AuthContext from '../../context//auth/authContext';

const Home = ({ history }) => {
  const authContext = useContext(AuthContext);

  const { loadUser, loading } = authContext;

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    } else {
      history.push('/login');
    }

    // eslint-disable-next-line
  }, []);
  if (loading) {
    return <Skeleton active />;
  }
  return (
    <div>
      <Articles />
    </div>
  );
};

export default Home;
