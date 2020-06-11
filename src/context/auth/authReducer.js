import {
  LOGIN,
  REGISTER,
  LOADING,
  LOGOUT,
  ERROR_AUTH,
  LOAD_USER,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case LOAD_USER:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.data(),
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case LOGIN:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case REGISTER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: null,
        loading: false,
        error: null,
        user: null,
      };
    case ERROR_AUTH:
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: null,
        loading: false,
        error: action.payload.error,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return { ...state };
  }
};
