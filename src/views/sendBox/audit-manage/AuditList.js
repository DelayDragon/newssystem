import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Table, Tag,notification } from 'antd'
// import { SettingOutlined } from '@ant-design/icons'

export default function AuditList() {
  const navigate = useNavigate()
  const [dataSource, setdataSource] = useState([])
  const { username } = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
    //_ne不等于，_jte大于,_lte小于
    axios.get(`http://localhost:5000/news?author=${username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res => {
      console.log(res.data)
      setdataSource(res.data)
    })
  }, [username])
  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title',
      render: (title, item) => {
        return <a href={`/newssendbox/news-manage/preview/${item.id}`}>{title}</a>
      }
    },
    {
      title: '作者',
      dataIndex: 'author',
    },
    {
      title: '新闻分类',
      dataIndex: 'category',
      render: (category) => {
        return <div>{category.label}</div>
      }
    },
    {
      title: '审核状态',
      dataIndex: 'auditState',
      render: (auditState) => {
        const auditList = ['', '审核中', '已通过', '未通过']
        const colorList = ['', 'orange', 'green', 'red']
        return <Tag color={colorList[auditState]}>{auditList[auditState]}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          {
            item.auditState === 1 && <Button onClick={()=>{handleRervert(item)}}>撤销</Button>
          }
          {
            item.auditState === 2 && <Button type="primary" onClick={()=>{handlePublish(item)}}>发布</Button>
          }
          {
            item.auditState === 3 && <div><Button type="primary" onClick={()=>{handleUpdate(item)}}>修改</Button><Button onClick={()=>{handleRervert(item)}}>撤销</Button></div>
          }
        </div>
      }
    },
  ]
  //撤销审核：更改auditState===0
  const handleRervert=(item)=>{
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.patch(`http://localhost:5000/news/${item.id}`,{
      auditState:0
    }).then(res=>{
      notification.info({
        message: `通知`,
        description:
            `你可以在'草稿箱'中查看你的新闻`,
        placement: 'bottomRight',
    });
    })
  }
  //跳转更新页面
  const handleUpdate=(item)=>{
    navigate(`/newssendbox/news-manage/update/${item.id}`)
  }
  //发布新闻：更改publishState===2
  const handlePublish=(item)=>{
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.patch(`http://localhost:5000/news/${item.id}`,{
      publishState:2
    }).then(res=>{
      notification.info({
        message: `通知`,
        description:
            `你可以在【发布管理】中的【已发布】查看你的新闻`,
        placement: 'bottomRight',
    });
    })
  }
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 6 }} rowKey={item => item.id} />
    </div>
  )
}
