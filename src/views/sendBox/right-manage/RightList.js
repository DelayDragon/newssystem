import { Table, Tag,Button,Modal,Popover, Switch } from 'antd';
import {
  SettingOutlined,
  ExclamationCircleOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import axios from 'axios';
import React,{useState , useEffect} from 'react'


const { confirm } = Modal;

export default function RightList() {
  
  const [dataSource,setdataSource] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:5000/rights?_embed=children').then(res=>{   
      const list = res.data
      list.forEach(item => {
        if(item.children.length===0){
          item.children = ""
        }
      });
      setdataSource(list)
    })
  },[])
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id)=>{
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'label',
      render:(label)=>{
        return <b>{label}</b>
      }
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render:(key)=>{
        return <Tag color='red'>{key}</Tag>
      }
    },
    {
      title: '操作',
      render:(item)=>{
        return <div>
          <Popover content={
            <div style={{textAlign:'center'}}>
              <Switch checked={item.pagepermisson} onChange={()=>switchMethod(item)}></Switch>
            </div>} title="页面配置项" trigger={item.pagepermisson===undefined?'':'click'}>
            <Button type="primary" shape="circle" icon={<SettingOutlined />} disabled={item.pagepermisson===undefined}/>
          </Popover>
          <span> | </span>
          <Button danger shape="circle" icon={<DeleteOutlined /> } onClick={()=>{confirmDelete(item)}} />
        </div>
      }
    },
  ];
  const switchMethod=(item)=>{
    item.pagepermisson=item.pagepermisson===1?0:1
    console.log(item)
    setdataSource([...dataSource])
    if(item.grade===1){
      axios.patch(`http://localhost:5000/rights/${item.id}`,{
        pagepermisson:item.pagepermisson
      })
    }if(item.grade===2){
      axios.patch(`http://localhost:5000/children/${item.id}`,{
        pagepermisson:item.pagepermisson
      })
    }
  }
  // 确认删除
  const confirmDelete=(item)=>{
    confirm({
      title: '你确定要删除吗?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
  
      onOk() {
        console.log('OK');
        deleleMethod(item)
      },
  
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  // 删除方法
  const deleleMethod=(item)=>{
    if(item.grade === 1){
      setdataSource(dataSource.filter(data=>data.id!==item.id))
      // axios.delete(`http://localhost:5000/rights/${item.id}`)
      console.log(item)
    }if(item.grade === 2){
      let list = dataSource.filter(data=>data.id===item.rightId)
      list[0].children = list[0].children.filter(data=>data.id!==item.id)
      setdataSource([...dataSource])
      // axios.delete(`http://localhost:5000/children/${item.id}`)
    }
  }
  return (
      <div>
        <Table dataSource={dataSource} columns={columns} pagination={{pageSize:6}}/>
      </div>

    // <div>
    //   <Table dataSource={dataSource} columns={columns} 
    //   // pagination={{pageSize:6}}
    //   />;
    // </div>
  )
}
