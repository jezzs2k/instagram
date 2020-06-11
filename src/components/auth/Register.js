import React, { useContext, useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';

import './Register.css';

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

const RegisterForm = (props) => {
  const authContext = useContext(AuthContext);
  const { register, isAuthenticated } = authContext;
  const onFinish = (values) => {
    register(values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (isAuthenticated || localStorage.token) {
      props.history.push('/');
    }

    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <div className='register'>
      <div className='backHome'>
        <Link to='/'>Back to Home</Link>
      </div>
      <h2 className='title'>REGISTER</h2>
      <Form
        {...layout}
        name='basic'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          label='Nickname'
          name='nickname'
          rules={[
            {
              required: true,
              message: 'Please input your nickname!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Email'
          name='email'
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
          <Input.Password />
        </Form.Item>
        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  'The two passwords that you entered do not match!'
                );
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
        <Link to='/' className='linkToRegister'>
          Login
        </Link>
      </Form>
    </div>
  );
};

export default RegisterForm;
