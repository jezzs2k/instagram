import React, { useState, useContext } from 'react';
import { Form, Input, Button } from 'antd';

import { storage } from '../../firebase';

import './PostArticle.css';

import ArticleContext from '../../context/Articles/articleContext';
import AuthContext from '../../context/auth/authContext';

const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 20,
  },
};

const ArticleItem = ({ history }) => {
  const articleContext = useContext(ArticleContext);
  const authContext = useContext(AuthContext);

  const { createArticle } = articleContext;
  const { user } = authContext;

  const [imageAsFile, setImageAsFile] = useState('');
  const [imageAsUrl, setImageAsUrl] = useState('');

  const onFinish = (values) => {
    createArticle({
      title: values.text,
      image: imageAsUrl,
      postedNickName: user.nickname,
      postedAvatar: user.avatar,
      userId: user.id,
    });

    history.push('/');
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    Error(errorInfo);
    console.log('Failed:', errorInfo);
  };

  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  const handleFireBaseUpload = (e) => {
    e.preventDefault();
    console.log('start of upload');
    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    }

    const uploadTask = storage
      .ref(`/images/${imageAsFile.name}`)
      .put(imageAsFile);

    uploadTask.on(
      'state_changed',
      (snapShot) => {
        console.log(snapShot);
      },
      (err) => {
        console.log(err);
      },
      () => {
        storage
          .ref('images')
          .child(imageAsFile.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl(fireBaseUrl);
          });
      }
    );
  };

  return (
    <div className='Post_Article'>
      <Form
        {...layout}
        name='basic'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item label='Title' name='text'>
          <Input />
        </Form.Item>
        <Form.Item label='Image'>
          <input type='file' onChange={handleImageAsFile} />
          <button
            onClick={handleFireBaseUpload}
            className='preview-btn'>{`Preview && upload`}</button>
          {imageAsUrl !== '' && (
            <div className='preview'>
              <img src={imageAsUrl} className='article-img' alt='article' />
            </div>
          )}
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ArticleItem;
