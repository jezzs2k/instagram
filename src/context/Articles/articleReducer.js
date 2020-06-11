import { LOADING, ERROR, LOAD_ARTICLE, CREATE_ARTICLE } from '../types';

export default (state, action) => {
  switch (action.type) {
    case LOAD_ARTICLE:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case CREATE_ARTICLE:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };

    case ERROR:
      return {
        ...state,
        posts: null,
        loading: false,
        error: action.payload,
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
