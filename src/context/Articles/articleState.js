import React, { useReducer } from 'react';
import shortid from 'shortid';

import ArticleReducer from './articleReducer';
import ArticleContext from './articleContext';

import { LOADING, ERROR, LOAD_ARTICLE, CREATE_ARTICLE } from '../types';

import { db } from '../../firebase';

const ArticleState = (props) => {
  const initialState = {
    posts: [],
    loading: null,
    error: null,
  };

  const [state, dispatch] = useReducer(ArticleReducer, initialState);

  const loadPosts = async () => {
    try {
      const docs = await db.collection('articles').get();

      const articles = docs.docs.map((doc) => {
        return doc.data();
      });

      dispatch({
        type: LOAD_ARTICLE,
        payload: articles,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: { error },
      });
    }
  };

  const createArticle = async (data) => {
    try {
      setLoading();

      const id = shortid.generate();

      await db
        .collection('articles')
        .doc(id)
        .set({
          ...data,
          id: id,
          comments: [],
          hearts: [],
          timeStamps: new Date().getTime(),
        });

      console.log('Document successfully written!');

      dispatch({
        type: CREATE_ARTICLE,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: { error },
      });
    }
  };

  const deleteArticle = async (id) => {
    try {
      setLoading();
      await db.collection('articles').doc(id).delete();
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: { error },
      });
    }
  };

  const commentFun = async (data, idDocument) => {
    try {
      setLoading();
      const dataArticle = await (
        await db.collection('articles').doc(idDocument).get()
      ).data();

      await db
        .collection('articles')
        .doc(idDocument)
        .set({
          ...dataArticle,
          comments: [data, ...dataArticle.comments],
        });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: { error },
      });
    }
  };

  const handleLikeButton = async (data, idDocument) => {
    try {
      setLoading();
      const dataArticle = await (
        await db.collection('articles').doc(idDocument).get()
      ).data();

      let heartsHandle;

      if (!data.isEnjoy) {
        heartsHandle = dataArticle.hearts.filter(
          (item) => item.userId !== data.userId
        );
      } else {
        heartsHandle = [...dataArticle.hearts, data];
      }

      await db
        .collection('articles')
        .doc(idDocument)
        .set({
          ...dataArticle,
          hearts: [...heartsHandle],
        });
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: { error },
      });
    }
  };

  const setLoading = () => {
    dispatch({
      type: LOADING,
    });
  };

  return (
    <ArticleContext.Provider
      value={{
        posts: state.posts,
        setLoading,
        loadPosts,
        createArticle,
        deleteArticle,
        commentFun,
        handleLikeButton,
      }}>
      {props.children}
    </ArticleContext.Provider>
  );
};

export default ArticleState;
