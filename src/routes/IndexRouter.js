import React from 'react'
import { Navigate } from 'react-router-dom'
import Login from '../views/Login/Login'
import RoleList from '../views/sendBox/right-manage/RoleList'
import RightList from '../views/sendBox/right-manage/RightList'
import Home from '../views/sendBox/home/Home'
import UserList from '../views/sendBox/user-manage/UserList'
import Nopermission from '../views/sendBox/nopermission/Nopermission'
import NewsSendBox from '../views/sendBox/NewsSendBox'
import NewsAdd from '../views/sendBox/news-manage/NewsAdd'
import NewsDraft from '../views/sendBox/news-manage/NewsDraft'
import NewsCategory from '../views/sendBox/news-manage/NewsCategory'
import Audit from '../views/sendBox/audit-manage/Audit'
import AuditList from '../views/sendBox/audit-manage/AuditList'
import Unpublished from '../views/sendBox/published-manage/Unpublished'
import Published from '../views/sendBox/published-manage/Published'
import Sunset from '../views/sendBox/published-manage/Sunset'
import NewsPreview from '../views/sendBox/news-manage/NewsPreview'
import NewsUpdate from '../views/sendBox/news-manage/NewsUpdate'
import News from '../views/news/News'
import Detail from '../views/news/Detail'


const newsRoute = [
  // 游客浏览页面
  { 
    path:'/news',
    element:<News/>
    // component:()=>import('../views/news/News')
  },
  { 
    path:'/detail/:id',
    element:<Detail/>
  },
  // 登录页面
  {
    path:'/login',
    element:<Login/>
  },
    // 发布页面
  {
    path:'/newssendbox',
    element:<NewsSendBox/>,
    // component:()=>import('../views/sendBox/NewsSendBox'),
    children:[
      // 首页
      {
        path:'home',
        element:<Home/>,
        // component:()=>import('../views/sendBox/home/Home'),
        // meta: {
        //   title: '首页',
        //   needLogin: true,
        // },
      },
      // 用户管理
      {
        path:"user-manage",
        element:<UserList/>
      },
      {
        path:'user-manage/list',
        element:<UserList/>
      },
      // 权限管理
      {
        path:"right-manage",
        element:<RightList/>
      },
      {
        path:"right-manage/role/list",
        element:<RoleList/>
      },
      {
        path:"right-manage/right/list",
        element:<RightList/>
      },
      // 新闻管理
      {
        path:"news-manage",
        element:<NewsAdd/>
      },
      {
        path:"news-manage/add",
        element:<NewsAdd/>
      },
      {
        path:"news-manage/draft",
        element:<NewsDraft/>
      },
      {
        path:"news-manage/category",
        element:<NewsCategory/>
      },
      {
        path:"news-manage/update/:id",
        element:<NewsUpdate/>
      },
      
      {
        path:"news-manage/preview/:id",
        element:<NewsPreview/>
      },
      // 审核管理
      {
        path:"audit-manage",
        element:<Audit/>
      },
      {
        path:"audit-manage/audit",
        element:<Audit/>
      },
      {
        path:"audit-manage/list",
        element:<AuditList/>
      },
      // 发布管理
      {
        path:"publish-manage",
        element:<Unpublished/>
      },
      {
        path:"publish-manage/unpublished",
        element:<Unpublished/>
      },
      {
        path:"publish-manage/published",
        element:<Published/>
      },
      {
        path:"publish-manage/sunset",
        element:<Sunset/>
      },

    ]
  },
  // 不存在页面
  {
    path:'*',
    element:<Nopermission/>
  },
  // 重定向
  {
    path:'/',
    element:<Navigate to = '/login'/>
    // component:()=>import('../views/sendBox/home/Home'),
    // component:()=>import('../views/news/News')
  }
]
export default newsRoute
// export default function IndexRouter() {
//   return (
//     <div>
//             <Routes>
//                 <Route path='/login' element={<Login/>}/>
//                 <Route path='/' element={<NewsSandBox/>}/>
//             </Routes>
//     </div>
//   )
// }
