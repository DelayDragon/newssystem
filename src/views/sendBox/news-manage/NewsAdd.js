import React, { useEffect, useState, useRef } from 'react'
import {  useNavigate } from 'react-router-dom';
import { PageHeader, Steps, Button, Form, Input, Select, message,notification } from 'antd'
import style from './News.module.css'
import axios from 'axios';
import NewsEditor from '../../../components/news-manage/NewsEditor';

export default function NewsAdd() {
  const { Step } = Steps;
  const { Option } = Select;
  const NewsForm = useRef(null)
  const [current, setcurrent] = useState(0)
  const [formInfo, setformInfo] = useState([])
  const [content, setcontent] = useState('')
  const [categoryList, setcategoryList] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:5000/categories').then(res => {
      console.log(res.data)
      setcategoryList(res.data)
    })
  }, [])

  const handleNext = () => {
    if (current === 0) {
      NewsForm.current.validateFields().then(res => {
        console.log(res)
        setformInfo(res)
        setcurrent(current + 1)
      }).catch(error => {
        console.log(error)
      })
    } else {
      //新闻内容不能为空：限制
      if (content === '' || content.trim() === '<p></p>') {
        message.error('新闻内容不能为空！')
      } else {
        console.log(formInfo, content)
        setcurrent(current + 1)
      }

    }

  }
  const handlePrevious = () => {
    setcurrent(current - 1)
  }

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const handleSave = (auditState) => {
    const User = JSON.parse(localStorage.getItem('token'))
    axios.post('http://localhost:5000/news', {
      ...formInfo,
      "content": content,
      "region": User.region?User.region:'全球',
      "author": User.username,
      "roleId": User.roleId,
      "auditState": auditState,
      "publishState": 0,
      "createTime": Date.now,
      "star": 0,
      "view": 0,
      // "publishTime": 0
    }).then(res=>{
      auditState===0?navigate('/newssendbox/news-manage/draft'):navigate('/newssendbox/audit-manage/list')
      // navigate(auditState===0?'/newssendbox/draft':'/newssendbox/audit-manage/list')
      notification.info({
        message: `通知`,
        description:
          // `你的新闻已存放到${auditState===0?'草稿箱':'审核列表'}`
          `你可以在${auditState===0?'草稿箱':'审核列表'}中查看你的新闻`,
        placement:'bottomRight',
      });
    })
  }
  return (
    <div>
      {/* 步骤条 */}
      <PageHeader
        className="site-page-header"
        title="撰写新闻"
        subTitle="步骤"
      />
      <Steps current={current}>
        <Step title="基本信息" description="新闻标题，新闻分类" />
        <Step title="新闻内容" description="新闻主题内容" />
        <Step title="新闻提交" description="保存草稿或提交审核" />
      </Steps>
      <div style={{ marginTop: '50px' }}>
        <div className={current === 0 ? '' : style.active}>
          <Form
            name="basic"
            ref={NewsForm}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="新闻分类"
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Select>
                {
                  categoryList.map(item => <Option value={item.id} key={item.id}>{item.label}</Option>)
                }
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className={current === 1 ? '' : style.active}>
          <NewsEditor getContent={(value) => {
            console.log(value)
            setcontent(value)
          }}></NewsEditor>
        </div>
        <div className={current === 2 ? '' : style.active}>
          33333
        </div>
      </div>
      <div style={{ marginTop: '50px' }}>
        {
          current > 0 && <Button onClick={handlePrevious}>上一步</Button>
        }
        {
          current === 2 && <span>
            <Button type='primary' onClick={() => handleSave(0)}>保存草稿箱</Button>
            <Button danger onClick={() => handleSave(1)}>提交审核</Button>
          </span>
        }
        {
          current < 2 && <Button type='primary' onClick={handleNext}>下一步</Button>
        }
      </div>
    </div>
  )
}
