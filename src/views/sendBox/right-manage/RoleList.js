import { Table,Button,Modal,Tree  } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  SettingOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

export default function RoleList() {
  const [dataSource,setdataSource] = useState([])
  const [rightList,setrightList] = useState([])
  const [currentRights,setcurrentRights] = useState([])
  const [currentId,setcurrentId] =useState([])
  const [isModalVisible,setisModalVisible] = useState(false)
  const { confirm } = Modal;
  // 获取列表行数据
  useEffect(()=>{
    axios.get('http://localhost:5000/roles').then(res=>{
      console.log(res.data);
      setdataSource(res.data)
    })
  },[])
  // 获取权限数据
  useEffect(()=>{
    axios.get('http://localhost:5000/rights?_embed=children').then(res=>{
      res.data.forEach(item=>{
        if(item.children.length!==0){
          item.title=item.label;
          for(let i=0;i<item.children.length;i++){
            item.children[i].title=item.children[i].label
          }
        }else{
          return item.title=item.label;
        }
      });
      setrightList(res.data)
    })
  },[])
  // 列表列数据配置
  const columns=[
    {
      title: 'ID',
      dataIndex: 'id',
      render:(id)=>{
        return <b>{id}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      render:(roleName)=>{
        return <b>{roleName}</b>
      }
    },
    {
      title: '配置',
      dataIndex: '',
      render:(item)=>{
        return (
          <div>
            <Button type="primary" shape="circle" icon={<SettingOutlined />} onClick={()=>{
              setisModalVisible(true);
              setcurrentRights(item.rights);
              setcurrentId(item.id);
            }}/>
            <Button danger shape="circle" icon={<DeleteOutlined />} onClick={()=>{confirmDelete(item)}}/>
          </div>
        )
      }
    },
  ]

  // 删除对应角色
  const deleleMethod=(item)=>{
    setdataSource(dataSource.filter(data=>data.id!==item.id))
    // axios.delete(`http://localhost:5000/roles/${item.id}`)
    // console.log(dataSource);
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

  const handleOk=()=>{
    setisModalVisible(false)
    console.log(currentRights);
    setdataSource(dataSource.map((item)=>{
      if(item.id===currentId){
        return {
          ...item,
          rights:currentRights
        }
      }
      return item
    }))
    axios.patch(`http://localhost:5000/roles/${currentId}`,{
      rights:currentRights
    })
    console.log('ok');
  }
  const handleCancel=()=>{
    console.log('cancel');
    setisModalVisible(false)
  }


  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
    setcurrentRights(checkedKeys.checked)
  };
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={(item)=>item.id}></Table>
      {/* 弹出框 */}
      <Modal title="角色权限配置" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Tree
        checkable
        checkStrictly={true}
        // defaultExpandedKeys={}
        // defaultSelectedKeys={}
        checkedKeys={currentRights}
        onSelect={onSelect}
        onCheck={onCheck}
        treeData={rightList}
        />
      </Modal>
    </div>
  )
}
