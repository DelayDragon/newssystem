import React from 'react'
import {  Table } from 'antd'

export default function NewsPublish(props) {

    const columns = [
        {
          title: '新闻标题',
          dataIndex: 'label',
          render: (label, item) => {
            return <a href={`/newssendbox/news-manage/preview/${item.id}`}>{label}</a>
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
                {props.button(item.id)}
            </div>
          }
        },
      ]
  return (
    <div>
        <Table dataSource={props.dataSource} columns={columns} pagination={{ pageSize: 6 }} rowKey={item => item.id} />
    </div>
  )
}
