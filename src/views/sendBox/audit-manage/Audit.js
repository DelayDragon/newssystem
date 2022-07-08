import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table, notification } from 'antd'


export default function Audit() {
  const [dataSource,setdataSource] = useState([])
  const {roleId,region,username} = JSON.parse(localStorage.getItem('token'))
  useEffect(()=>{
    const roleObj ={
      "1":'superadmin',
      "2":'admin',
      "3":'editor'
    }
    axios.get(`http://localhost:5000/news?auditState=1&_expand=category`).then(res=>{
      const list = res.data
      console.log(list);
      setdataSource(roleObj[roleId]==="superadmin"?list:[
        ...list.filter(item=>item.author===username),
        ...list.filter(item=>item.region===region && roleObj[item.roleId]==='editor')
      ])
    })
  },[roleId,region,username])
  const columns = [
    {
      title: '新闻标题',
      dataIndex: 'title'||'label',
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
      title: '操作',
      render: (item) => {
        return <div>
              <Button type='primary' onClick={()=>{handleAudit(item,2,1)}}>通过</Button>
              <Button danger onClick={()=>{handleAudit(item,3,0)}}>驳回</Button>
        </div>
      }
    },
  ]
  const handleAudit = (item,auditState,publishState)=>{
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.patch(`http://localhost:5000/news/${item.id}`,{
      auditState,
      publishState,
    }).then(res=>{
      notification.info({
        message: `通知`,
        description:
            `你可以在【审核列表】中查看你的新闻`,
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
