import axios from 'axios'
import { useEffect, useState } from 'react'
import {notification} from 'antd'

function usePublish(type){
    const [dataSource,setdataSource] = useState([])
    const { username } = JSON.parse(localStorage.getItem('token'))
    useEffect(()=>{
      axios.get(`http://localhost:5000/news?author=${username}&publishState=${type}&_expand=category`).then(res=>{
        console.log(res.data)
        setdataSource(res.data)
      })
    },[username])

    const handlePublish=(id)=>{
        console.log(id);
        setdataSource(dataSource.filter(item=>item.id!==id))
        axios.patch(`http://localhost:5000/news/${id}`,{
            publishState:2,
            publishTime:Date.now()
        }).then(res=>{
            notification.info({
              message: `通知`,
              description:
                  `你可以在【已发布】查看你的新闻`,
              placement: 'bottomRight',
          });
          })
    }
    const handleSunset=(id)=>{
        console.log(id);
        setdataSource(dataSource.filter(item=>item.id!==id))
        axios.patch(`http://localhost:5000/news/${id}`,{
            publishState:3,
        }).then(res=>{
            notification.info({
              message: `通知`,
              description:
                  `你可以在【已下线】中的查看你的新闻`,
              placement: 'bottomRight',
          });
          })
    }
    const handleDelete=(id)=>{
        console.log(id);
        setdataSource(dataSource.filter(item=>item.id!==id))
        axios.delete(`http://localhost:5000/news/${id}`).then(res=>{
            notification.info({
              message: `通知`,
              description:
                  `你已经删除了你的新闻`,
              placement: 'bottomRight',
          });
          })
    }
    return{
        dataSource,
        handlePublish,
        handleSunset,
        handleDelete
    }
}
export default usePublish