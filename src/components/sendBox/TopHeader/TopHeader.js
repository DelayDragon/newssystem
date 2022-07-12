import { Layout,Avatar, Button  } from 'antd';
import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { DownOutlined,UserOutlined  } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { useNavigate } from 'react-router';
import { changeCollapsed } from '../../../store/modules/collapsedState';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
const { Header} = Layout;


export default function TopHeader() {
  const dispatch = useDispatch()
  const {collapsed} = useSelector(state=>state.collapsedS) 
  // const [collapsed,setCollapsed] = useState(false)
  const navigate = useNavigate()
  const {role:{roleName},username} = JSON.parse(localStorage.getItem('token'))
  // const changeCollapsed=()=>{
    // setCollapsed(!collapsed)
  // }

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
              {roleName}
            </a>
          ),
        },
        {
          key: '2',
          danger: true,
          label: '退出',
          onClick:()=>{
            localStorage.removeItem('token')
            navigate('/Login')
          }
        },
      ]}
    />
  );
  return (
      <Header className="site-layout-background" style={{ padding: '0,16px'}}>
          {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })} */}
          {
            collapsed?<MenuUnfoldOutlined onClick={()=>{dispatch(changeCollapsed())}}/>:<MenuFoldOutlined onClick={()=>{dispatch(changeCollapsed())}}/>
          }
          <div style={{float:'right'}}>
            <Button type='primary' style={{float:'left',lineHeight:'64px'}}>游客模式</Button>
            <span>欢迎<span style={{color:'#1890ff'}}>{username}</span>您回来！</span>
            <Dropdown overlay={menu}>
              {/* <a onClick={e => e.preventDefault()}> */}
                <Space>
                  <Avatar size="large" icon={<UserOutlined />} />
                  <DownOutlined />
                </Space>
              {/* </a>  */}
            </Dropdown>
          </div>
        </Header>
  )
}
