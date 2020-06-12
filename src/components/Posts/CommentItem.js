import React, { useState } from 'react';
import { EllipsisOutlined } from '@ant-design/icons';

import './CommentItem.css';

const CommentItem = ({
  comment,
  editComment,
  deleteComment,
  articleId,
  userId,
}) => {
  const [isOpen, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(!isOpen);
  };
  return (
    <div className='comment-item'>
      <h2 className='name'>{comment.namePosted}</h2>
      <p className='text'>{comment.text}</p>
      <div className='action'>
        <EllipsisOutlined className='icon-action' onClick={handleOpenModal} />
        {userId === comment.userId && isOpen && (
          <div className='action-item'>
            <p
              onClick={() => {
                deleteComment(articleId, comment.id);
                editComment(comment.text);
              }}>
              Edit comment
            </p>
            <p
              onClick={() => {
                deleteComment(articleId, comment.id);
              }}>
              Delete
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
