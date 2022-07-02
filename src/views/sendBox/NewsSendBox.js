import './NewsSendBox.css'
import React from 'react'
import { useRoutes } from 'react-router-dom';
import routes from '../../routes/IndexRouter'
import SideMenu from '../../components/sendBox/SideMenu/SideMenu'
import TopHeader from '../../components/sendBox/TopHeader/TopHeader'
import { Layout} from 'antd';
const { Content } = Layout;


// export default function NewsSendBox() {
//   const element = useRoutes(routes)
//   return (
//     <Layout>
//       <SideMenu/>
//       <Layout  className="site-layout">
//         <TopHeader/>
//         <Content
//           className="site-layout-background"
//           style={{
//             margin: '24px 16px',
//             padding: 24,
//             minHeight: 280,
//             overflow:'auto'
//           }}
//         >
//         {/* {element} */}
//         </Content>
//       </Layout>
//     </Layout>

//   )
// }

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
          {props.children}
        {/* {element} */}
        {/* {item} */}
        </Content>
      </Layout>
    </Layout>
  )
}
export default NewsSendBox