import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlurCircularIcon from '@material-ui/icons/BlurCircular';
import HomeIcon from '@material-ui/icons/Home';
import { Skeleton } from 'antd';

import './Profile.css';

import AuthContext from '../../context/auth/authContext';

const User = ({ history }) => {
  const authContext = useContext(AuthContext);

  const { user, loadUser, loading } = authContext;
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
    <div className='page-user'>
      <div className='logo-user'>
        <img src={user && user.avatar} className='logo-img' alt='logo' />
      </div>
      <div className='info-user'>
        <h2 className='name-user'>{user && user.nickname}</h2>
        <h2 className='name-store'>
          <Link to='/'>
            <span>Home</span>
            <HomeIcon className='icon-store' color='#1890ff' />
          </Link>
        </h2>
        <h2 className='rate-percent'>20 Follow</h2>
        <h2 className='amount-product'>2 Article</h2>
        <Link to='/user/profile/edit'>
          <div className='btn btn-edit'>
            <span>Edit profile</span>
            <BlurCircularIcon className='icon-edit' />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default User;
