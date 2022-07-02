import React, { useEffect, useState,useRef } from 'react'
import {Switch, Table,Button,Modal} from 'antd'
import {
  DeleteOutlined,
  SettingOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'
import UserForm from '../../../components/user-manage/UserForm'
import axios from 'axios'
import NewsSendBox from '../NewsSendBox'

export default function UserList() {
  const {confirm} = Modal
  const [roleList,setroleList] = useState([])
  const [regionList,setregionList] =useState([])
  const [isAddVisible,setisAddVisible] = useState(false)
  const [dataSource,setdataSource] = useState([])
  const [isModalVisible,setisModalVisible] = useState(false)
  const [isUpdateDisabled,setisUpdateDisabled] = useState(false)
  const [current,setcurrent]=useState([])
  const addForm = useRef(null)
  const updateForm = useRef(null)
  //获取用户全部信息
  useEffect(()=>{
    axios.get('http://localhost:5000/users?_expand=role').then(res=>{
      console.log(res.data)
      setdataSource(res.data)
    })
  },[])
  // 获取区域数据
  useEffect(()=>{
    axios.get('http://localhost:5000/regions').then(res=>{
      console.log(res.data)
      setregionList(res.data)
    })
  },[])
  // 获取角色数据
  useEffect(()=>{
    axios.get('http://localhost:5000/roles').then(res=>{
        console.log(res.data)
        setroleList(res.data)
    })
  },[])
  //列表列信息
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      filters: [
        ...regionList.map(item=>({
          text:item.label,
          value:item.value
        })),
        {
          text:'全球',
          value:'全球',
        }
      ],
      onFilter:(value,item)=>{
        if(value==='全球'){
          return item.region===''
        }else{
          return item.region===value
        }
      },
      render:(region)=>{
        return <b>{region===''?'全球':region}</b>
      }
    },
    {
      title: '角色',
      dataIndex: 'role',
      render:(role)=>{
        return <b>{role.roleName}</b>
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
      render:(username)=>{
        return <b>{username}</b>
      }
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render:(roleState,item)=>{
        return <Switch checked={roleState} disabled={item.default} onChange={()=>handelChange(item)}></Switch>
      }
    },
    {
      title: '操作',
      dataIndex: '',
      render:(item)=>{
        return (
          <div>
            <Button type="primary" shape="circle" icon={<SettingOutlined /> } disabled={item.default} onClick={()=>{handleUpdate(item)}}/>
            <Button danger shape="circle" icon={<DeleteOutlined />} disabled={item.default} onClick={()=>{confirmDelete(item)}}/>
          </div>
        )
      }
    },
  ]
  //改变用户状态
  const handelChange=(item)=>{
    console.log(item);
    item.roleState = !item.roleState
    setdataSource([...dataSource])
    axios.patch(`http://localhost:5000/users/${item.id}`,{
      roleState:item.roleState
    })
  }
  //点击更新用户信息
  const handleUpdate=(item)=>{
    setisModalVisible(true) //展示
    setTimeout(() => { //根据点击item的id改变选择框的可选是否
      if(item.roleId===1){
        setisUpdateDisabled(true)
      }else{
        setisUpdateDisabled(false)
      }
    }, 0);
    setTimeout(() => { //填充数据
      console.log(updateForm.current)
      updateForm.current.setFieldsValue(item)
    }, 0);
    setcurrent(item)
  }
  //删除
  const deleleMethod=(item)=>{ 
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    axios.delete(`http://localhost:5000/users/${item.id}`)
  }
  //是否删除弹框
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
  //确定更新，同步服务器和本地数据，更新isUpdateDisabled状态
  const updateFormOK=()=>{
    updateForm.current.validateFields().then(value=>{
      console.log(value)
      setisModalVisible(false)
      setdataSource(dataSource.map(item=>{
        if(item.id===current.id){
          return {
            ...item,
            ...value,
            role:roleList.filter(data=>data.id===value.roleId)[0]
          }
        }
        return item
      }))
      axios.patch(`http://localhost:5000/users/${current.id}`,
       value)
    }).catch(err=>{
      console.log(err)
    })
    setisUpdateDisabled()
    console.log('ok');
  }
  //取消更新，更新isUpdateDisabled状态
  const handleCancel=()=>{
    setisModalVisible(false)
    setisUpdateDisabled()
    console.log('cancel成功');
  }

  return (
    <NewsSendBox children={
    <div>
      <Button type="primary" onClick={()=>{setisAddVisible(true)}}>添加用户</Button>
      <Table dataSource={dataSource} columns={columns} rowKey={item=>item.id} pagination={{pageSize:5}}></Table>
      {/* 添加用户弹框 */}
      <Modal
      forceRender
      visible={isAddVisible}
      title="添加用户"
      okText="创建"
      cancelText="取消"
      onCancel={()=>{
        setisAddVisible(false)
      }}
      onOk={() => {
        // console.log(addForm)
        addForm.current.validateFields().then(value=>{
          addForm.current.resetFields()
          setisAddVisible(false)
          //post到后端，生成id，在设置dataSource,方面后边的删除和更新
          axios.post(`http://localhost:5000/users`,{
            ...value,
            "roleState":true,
            "default":false
          }).then(res=>{
            console.log(res.data)
            setdataSource([...dataSource,{
              ...res.data,
              role:roleList.filter(item=>item.id===value.roleId)[0]
            }])
          })
        }).catch(err=>{
          console.log(err)
        })
      }}
    >
    <UserForm regionList={regionList} roleList={roleList} ref={addForm}/>
    </Modal>
      {/* 更新用户弹框 */}
      <Modal 
      title="更新用户信息"
      visible={isModalVisible} 
      okText="确定"
      cancelText="取消"
      onOk={()=>{updateFormOK()}} 
      onCancel={()=>{handleCancel()}}>
        <UserForm regionList={regionList} roleList={roleList} ref={updateForm} isUpdateDisabled={isUpdateDisabled}/>
      </Modal>
    </div>
    }>
    </NewsSendBox>
  )
}

