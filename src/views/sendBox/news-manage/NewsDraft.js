import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table,Button,Modal } from 'antd'
import {
  SettingOutlined,
  DeleteOutlined,
  UploadOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'

export default function NewsDraft() {
  const {confirm} = Modal
  const [dataSource, setdataSource] = useState([])
  const { username } = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
    axios.get(`http://localhost:5000/news?author=${username}&auditState=0&_expand=category`).then(res => {
      const list = res.data
      setdataSource(list)
    })
  }, [username])

  const deleleMethod=(item)=>{ 
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.delete(`http://localhost:5000/news/${item.id}`)
  }
  const confirmDelete=(item)=>{
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
  
      onOk() {
        console.log('OK',item);
        deleleMethod(item)
      },
  
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '新闻标题',
      dataIndex: 'title',
      render:(title,item)=>{
        return <a href={`/newssendbox/news-manage/preview/${item.id}`}>{title}</a>
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render: (category) => {
        return category.label
      }
    },
    {
      title: '操作',
      dataIndex: '',
      render: (item) => {
        return <div>
          <Button type="primary" shape="circle" icon={<SettingOutlined />}  />
          <Button danger shape="circle" icon={<DeleteOutlined />}  onClick={()=>{confirmDelete(item)}}/>
          <Button type='primary' shape="circle" icon={<UploadOutlined />} />
        </div>
      }
    },
  ]
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={item=>item.id}/>
    </div>
  )
}
