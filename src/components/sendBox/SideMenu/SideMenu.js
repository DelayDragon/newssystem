
import './SideMenu.css'
import { Layout, Menu } from 'antd';
import React,{useEffect, useState} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import {
  ContainerOutlined,
  CaretDownOutlined,
  SendOutlined,
  LineOutlined,
  AlignCenterOutlined,
  SnippetsOutlined,
  FileAddOutlined,
  MessageOutlined,
  TableOutlined,
  ApartmentOutlined,
  TeamOutlined,
  UserOutlined,
  AuditOutlined,
  HomeOutlined,
  MailOutlined, 
  UnorderedListOutlined,
} from '@ant-design/icons';
import axios from 'axios';

const {Sider} = Layout;

const iconList={
  // 首页
  "/newssendbox/home":<HomeOutlined />,
  // 用户管理
  "/user-manage":<UserOutlined />,
  "/user-manage/list":<UnorderedListOutlined />,
  // 权限管理
  "/right-manage":<ApartmentOutlined />,
  "/right-manage/role/list":<TeamOutlined />,
  "/right-manage/right/list":<TableOutlined />,
  // 新闻管理
  "/news-manage":<MessageOutlined />,
  "/news-manage/add":<FileAddOutlined />,
  "/news-manage/draft":<SnippetsOutlined />,
  "/news-manage/category":<AlignCenterOutlined />,
  // 审核管理
  "/audit-manage":<AuditOutlined />,
  "/audit-manage/audit":<AuditOutlined />,
  "/audit-manage/list":<UnorderedListOutlined />,
  // 发布管理
  "/publish-manage":<ContainerOutlined />,
  "/publish-manage/unpublished":<LineOutlined />,
  "/publish-manage/published":<SendOutlined />,
  "/publish-manage/sunset":<CaretDownOutlined />
  }

export default function SideMenu() {
  const [menu,setMeun] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const {role:{rights}} = JSON.parse(localStorage.getItem('token'))
  console.log(rights)
  useEffect(()=>{
    axios.get('http://localhost:5000/rights?_embed=children').then(res=>{
      // console.log(res);
      let list = res.data.filter((item)=>{
        return item.pagepermisson===1 && rights.includes(item.key)
      })
      console.log(list)
      setMeun(list)
    })
  },[])
  const onclickLink=(key)=>{
    navigate('/newssendbox'+key.key)
    console.log(key);
  }

  const checkPermission=(menu)=>{
    for(let i=0;i<menu.length;i++){
      if(menu[i].children.length===0){
        menu[i].children=''
      }
      else{
        let arr = menu[i].children.filter((item)=>{
          return item.pagepermisson===1 && rights.includes(item.key)
        })
        menu[i].children=arr
      }
    }
    // for(let i=0;i<menu.length;i++){
    //   if(menu[i].children.length> 0 &&menu[i].p){
    //     menu[i].children=''
    //   }
    //   else{
    //     let arr = menu[i].children.filter((item)=>{
    //       return item.pagepermisson===1
    //     })
    //     menu[i].children=arr
    //   }
    // }

    // 新
    // menu.forEach(item => {
    //   if(item.children.length===0){
    //     item.children=''
    //   }
    // });
    // for(let i=0;i<menu.length;i++){
    //     let arr = menu[i].children.filter((item)=>{
    //       return item.pagepermisson===1
    //     })
    //     menu[i].children=arr
      // let arr = menu[i].children.filter((item)=>{
      //   return item.pagepermisson
      // })
      // menu[i].children=arr
    }

  
  const addIcon=(menu)=>{
    for(let i=0;i<menu.length;i++){
      if(menu[i].children===undefined){
        menu[i].icon=iconList[menu[i].key]
        continue
      }else{
        menu[i].icon=iconList[menu[i].key]
        for(let j=0;j<menu[i].children.length;j++){
          menu[i].children[j].icon=iconList[menu[i].children[j].key]
        }
      }
    }
  }

  const renderMenu=()=>{
    addIcon(menu)
    checkPermission(menu)
    return <Menu
    defaultOpenKeys={['/'+location.pathname.split('/')[2]]}
    theme="dark"
    mode="inline"
    defaultSelectedKeys={location.pathname.split('/newssendbox')[1]}
    items={menu}
    style={{icon:<MailOutlined />}}
    onClick={(key)=>{onclickLink(key)}}>
    </Menu>
  }
  // console.log(location)
  return (
      <Sider trigger={null} collapsible collapsed={false}>
        <div style={{display:'flex',height:'100%',flexDirection:'column'}}>
          <div className="logo" >全球新闻发布管理系统</div>
          <div style={{flex:1,"overflow":'auto'}}>
            {/* 动态遍历数组 */}
            {renderMenu()}
          </div>
        </div>
      </Sider>
  )
}


