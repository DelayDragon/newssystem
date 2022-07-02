import { Button } from 'antd'
import axios from 'axios'
import React from 'react'
import NewsSendBox from '../NewsSendBox'

export default function Home() {
  const ajax=()=>{
    //获取数据
    // axios.get('http://localhost:8000/posts').then(res=>{
    //   console.log(res.data);
    // })

    //增加数据
    // axios.post('http://localhost:8000/posts',{
    //   titel:'3333',
    //   author:'xiaoming'
    // })

    // 修改数据
    // (1)没修改的数据会被丢弃
    // axios.put('http://localhost:8000/posts/1',{
    //   title:'11-修改',
    // })
    // (2)局部修改
    // axios.patch('http://localhost:8000/posts/1',{
    //   title:'112-修改'
    // })

    // 删除数据
    // axios.delete('http://localhost:8000/posts/1')

    // _embed   获取新闻连同对应评论
    // axios.get('http://localhost:8000/posts?_embed=comments').then(res=>{
    //   console.log(res.data);
    // })

    //_expand   获取评论连同对应新闻
    // axios.get('http://localhost:8000/comments?_expand=post').then(res=>{
    //   console.log(res.data);
    // })

  }
  return (
    <NewsSendBox children={
    <div>
      <Button type="primary" onClick={ajax}>新闻更新</Button>
    </div>
    }>
    </NewsSendBox>
    
  )
}
