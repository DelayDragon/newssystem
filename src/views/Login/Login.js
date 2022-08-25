import React from 'react'
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import './Login.css'
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate()
  const onFinish = (values) => {
    // console.log('Received values of form: ', values);
    axios.get(`http://localhost:5000/users?_expand=role&username=${values.username}&password=${values.password}&roleState=true`).then(res=>{
      if(res.data.length!==0){
        localStorage.setItem('token',JSON.stringify(res.data[0]))
        navigate('/newssendbox/home')
      }else{
        console.log('用户不存在或密码与账号不匹配！');
        message.error('用户不存在或密码与账号不匹配！')
      }
    })
  };
  // console.log( localStorage.getItem('token'))
  return (
    <div style={{ background: 'rgb(35,39,65)', height: "100vh" }}>
      <div className='formContainer'>
        <div className='loginTitle'>全球新闻发布管理系统</div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          {/* 用户名 */}
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          {/* 密码 */}
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          {/* 登录按钮 */}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
