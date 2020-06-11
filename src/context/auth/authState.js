import React, { useReducer } from 'react';
import shortid from 'shortid';

import AuthReducer from './authReducer';
import AuthContext from './authContext';

import {
  LOGOUT,
  LOADING,
  LOGIN,
  ERROR_AUTH,
  REGISTER,
  LOAD_USER,
} from '../types';

import { db } from '../../firebase';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: null,
    error: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const loadUser = async () => {
    try {
      const doc = await db.collection('users').doc(localStorage.token).get();

      dispatch({
        type: LOAD_USER,
        payload: doc,
      });
    } catch (error) {
      dispatch({
        type: ERROR_AUTH,
        payload: { error },
      });
    }
  };

  const login = async (data) => {
    try {
      setLoading();
      const users = await db.collection('users').get();

      const match = users.docs.find((doc) => {
        if (
          doc.data().email === data.email &&
          doc.data().password === data.password
        ) {
          return true;
        }
        return false;
      });

      if (!match) {
        throw new Error('Email or password incorrect');
      }

      dispatch({
        type: LOGIN,
        payload: { token: match.id },
      });
    } catch (error) {
      dispatch({
        type: ERROR_AUTH,
        payload: { error },
      });
    }
  };

  const register = async (data) => {
    try {
      setLoading();
      const token = shortid.generate();
      await db
        .collection('users')
        .doc(token)
        .set({ ...data, id: token });
      console.log('A new user has been added');

      loadUser();

      dispatch({
        type: REGISTER,
        payload: { token: token },
      });
    } catch (error) {
      dispatch({
        type: ERROR_AUTH,
        payload: { error },
      });
    }
  };

  const logout = () => {
    setLoading();
    dispatch({
      type: LOGOUT,
    });
  };

  const setLoading = () => {
    dispatch({
      type: LOADING,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        setLoading,
        logout,
        login,
        register,
        loadUser,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
