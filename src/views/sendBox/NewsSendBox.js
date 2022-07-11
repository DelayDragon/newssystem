import './NewsSendBox.css'
import React from 'react'
import { Outlet } from 'react-router-dom';
import SideMenu from '../../components/sendBox/SideMenu/SideMenu'
import TopHeader from '../../components/sendBox/TopHeader/TopHeader'
import { Layout ,Spin} from 'antd';
import { useDispatch,useSelector } from 'react-redux';
const { Content } = Layout;


const NewsSendBox = (props) => {
  const dispatch = useDispatch()
  const {spinning} = useSelector(state=>state.spinning)
  // const element = useRoutes(routes)
  return (
    <Layout>
      <SideMenu />
      <Layout className="site-layout">
        <TopHeader />
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow: 'auto'
          }}
        >
          <Spin size="large"  spinning={spinning}>
            <Outlet />
          </Spin>
        </Content>
      </Layout>
    </Layout>
  )
}
export default NewsSendBox