import React, { useState, useContext, useEffect } from 'react';
import { Card, Avatar, Input, Button } from 'antd';
import { HeartOutlined, CommentOutlined } from '@ant-design/icons';

import AuthContext from '../../context/auth/authContext';

import './ArticleItem.css';

const { Meta } = Card;
const { TextArea } = Input;

const ArticleItem = ({
  article,
  deleteArticle,
  commentFun,
  handleLikeButton,
}) => {
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  const {
    title,
    image,
    postedNickName,
    postedAvatar,
    userId,
    id,
    hearts,
    comments,
  } = article;

  const [moreText, setMoreText] = useState(false);
  const [comment, setComment] = useState('');
  const [isEnjoy, setEnjoy] = useState(false);

  useEffect(() => {
    let has;
    if (hearts && hearts.length > 0 && user) {
      has = hearts.find((item) => {
        return item.userId === user.id;
      });

      if (has) {
        setEnjoy(has.isEnjoy);
      }
    }
    // eslint-disable-next-line
  }, [user]);

  const handleClick = () => {
    setMoreText(!moreText);
  };

  const clickLoveHandle = () => {
    setEnjoy(!isEnjoy);
    handleLikeButton({ isEnjoy: !isEnjoy, userId: user.id }, article.id);
  };

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const commentHandle = (data, idDocument) => {
    setComment('');
    commentFun(data, idDocument);
  };

  return (
    <div className='article'>
      <Card style={{ width: '100%' }} className='avatar-style'>
        <Meta avatar={<Avatar src={postedAvatar} />} title={postedNickName} />
        {user && user.id === userId && (
          <div className='action-article'>
            <p className='delete-btn' onClick={() => deleteArticle(id)}>
              Delete
            </p>
          </div>
        )}
      </Card>
      <Card
        style={{ width: '100%' }}
        cover={image.length !== '' ? <img alt='article' src={image} /> : ''}>
        <Meta className={moreText && 'content'} title={title} />
        {title.length > 50 && (
          <p className='more-title' onClick={handleClick}>
            More
          </p>
        )}
        <div className='action'>
          <HeartOutlined
            className={`icon ${isEnjoy && 'color'}`}
            onClick={clickLoveHandle}
          />
          <CommentOutlined className='icon' />
        </div>
        <div className='total-heart'>
          {hearts && hearts.length > 0 && <span>{hearts.length} Heart</span>}
        </div>
        <div className='comment'>
          {comments &&
            comments.length > 0 &&
            comments.map((item, i) => (
              <div className='comment-item' key={i}>
                <h2 className='name'>{item.namePosted}</h2>
                <p className='text'>{item.text}</p>
              </div>
            ))}
        </div>
        <div className='comment-form'>
          <TextArea
            className='comment-form-child'
            placeholder='comment ... '
            allowClear
            value={comment}
            onChange={onChange}
          />
          <Button
            shape='round'
            onClick={() =>
              commentHandle(
                { text: comment, namePosted: user.nickname },
                article.id
              )
            }>
            Post
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ArticleItem;
