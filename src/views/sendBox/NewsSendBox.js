import './NewsSendBox.css'
import React from 'react'
import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/sendBox/SideMenu/SideMenu'
import TopHeader from '../../components/sendBox/TopHeader/TopHeader'
import { Layout} from 'antd';
const { Content } = Layout;


const NewsSendBox=(props)=>{
  // const element = useRoutes(routes)
  return (
    <Layout>
      <SideMenu/>
      <Layout  className="site-layout">
        <TopHeader/>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow:'auto'
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
}
export default NewsSendBox