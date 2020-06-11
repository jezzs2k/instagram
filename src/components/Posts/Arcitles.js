import React, { useContext, useEffect } from 'react';

import ArticleContext from '../../context/Articles/articleContext';

import ArticleItem from './ArticleItem';

const Articles = () => {
  const articleContext = useContext(ArticleContext);
  const {
    posts,
    loadPosts,
    deleteArticle,
    commentFun,
    handleLikeButton,
  } = articleContext;

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line
  }, [posts]);

  return (
    <div>
      {posts &&
        posts.length > 0 &&
        posts.map((article) => (
          <ArticleItem
            article={article}
            deleteArticle={deleteArticle}
            commentFun={commentFun}
            handleLikeButton={handleLikeButton}
            key={article.id}
          />
        ))}
    </div>
  );
};

export default Articles;
