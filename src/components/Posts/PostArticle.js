import React, { useState, useContext } from 'react';
import { Form, Input, Button, Upload, Skeleton } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { storage } from '../../firebase';

import './PostArticle.css';

import ArticleContext from '../../context/Articles/articleContext';
import AuthContext from '../../context/auth/authContext';

const { TextArea } = Input;

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
  const handleImageAsFile = (e) => {
    const image = e.file.originFileObj;
    setImageAsFile((imageFile) => image);
    handleFireBaseUpload();
  };

  const [skeletonState, setSkeletonState] = useState(false);
  const handleUpload = () => {
    setSkeletonState(true);
  };

  const handleFireBaseUpload = (e) => {
    // e.preventDefault();
    console.log('start of upload');
    if (imageAsFile === '') {
      console.error(`Not an image, the image file is a ${typeof imageAsFile}`);
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

  const [comment, setComment] = useState('');
  const onChange = (e) => {
    setComment(e.target.value);
  };

  const onFinish = (values) => {
    createArticle({
      title: comment,
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
        <Form.Item label='Your Status'>
          <TextArea
            className='state-user'
            placeholder='Status ... '
            allowClear
            value={comment}
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item label='Image' onClick={handleUpload}>
          <Upload name='file' onChange={handleImageAsFile}>
            <Button>
              <UploadOutlined /> Click to upload
            </Button>
          </Upload>
          {skeletonState &&
            (imageAsUrl !== '' ? (
              <div className='preview'>
                <img src={imageAsUrl} className='article-img' alt='article' />
              </div>
            ) : (
              <Skeleton active />
            ))}
        </Form.Item>
        <Form.Item {...tailLayout}>
          {skeletonState &&
            (imageAsUrl !== '' ? (
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            ) : (
              <Button type='primary' htmlType='submit' disabled>
                Submit
              </Button>
            ))}
        </Form.Item>
      </Form>
    </div>
  );
};

export default ArticleItem;
