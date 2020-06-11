import React from 'react';

import BlurCircularIcon from '@material-ui/icons/BlurCircular';
import HomeIcon from '@material-ui/icons/Home';

import './Profile.css';

const User = () => {
  return (
    <div className='page-user'>
      <div className='logo-user'>
        <img
          src='https://picsum.photos/200/300'
          className='logo-img'
          alt='logo'
        />
      </div>
      <div className='info-user'>
        <h2 className='name-user'>Vu Thanh Hieu</h2>
        <h2 className='name-store'>
          Vu Thanh Hieu
          <span>
            <HomeIcon className='icon-store' />
          </span>
        </h2>
        <h2 className='rate-percent'>Comment Good</h2>
        <h2 className='amount-product'>2 Article</h2>
        <div className='btn btn-edit'>
          <span>Edit profile</span>
          <BlurCircularIcon className='icon-edit' />
        </div>
      </div>
    </div>
  );
};

export default User;
