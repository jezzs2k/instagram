import React, { useState, useContext } from 'react';
import { Form, Input, Button, Upload, Skeleton } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { storage } from '../../firebase';
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
  const authContext = useContext(AuthContext);

  const { user, updateUser } = authContext;

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

  const onFinish = (values) => {
    let nickname = values.text === '' ? user.nickname : values.text;
    let avatar = imageAsUrl === '' ? user.avatar : imageAsUrl;
    updateUser(
      {
        nickname: nickname,
        avatar: avatar,
      },
      user.id
    );

    history.push('/user');
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
        <Form.Item label='NickName' name='text'>
          <Input />
        </Form.Item>
        <Form.Item label='Avatar' onClick={handleUpload}>
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
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ArticleItem;
