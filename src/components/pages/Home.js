import React, { useEffect, useContext } from 'react';

import Articles from '../Posts/Arcitles';
import AuthContext from '../../context//auth/authContext';

const Home = () => {
  const authContext = useContext(AuthContext);

  const { loadUser } = authContext;

  useEffect(() => {
    if (localStorage.token) {
      loadUser();
    }

    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Articles />
    </div>
  );
};

export default Home;
