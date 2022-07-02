import React from 'react'
import { Navigate } from 'react-router-dom'
import Login from '../views/Login/Login'
import RoleList from '../views/sendBox/right-manage/RoleList'
import RightList from '../views/sendBox/right-manage/RightList'
import Home from '../views/sendBox/home/Home'
import UserList from '../views/sendBox/user-manage/UserList'
import Nopermission from '../views/sendBox/nopermission/Nopermission'

const newsRoute = [
  {
    path:'/login',
    element:<Login/>
  },
  // 首页
  {
    path:'/home',
    element:<Home/>
  },
  // 用户管理
  {
    path:"/user-manage",
    element:<UserList/>
  },
  {
    path:'/user-manage/list',
    element:<UserList/>
  },
  // 权限管理
  {
    path:"/right-manage",
    element:<RightList/>
  },
  {
    path:"/right-manage/role/list",
    element:<RoleList/>
  },
  {
    path:"/right-manage/right/list",
    element:<RightList/>
  },
  // 新闻管理
  {
    path:"/news-manage",
    element:<UserList/>
  },
  {
    path:"/news-manage/add",
    element:<UserList/>
  },
  {
    path:"/news-manage/draft",
    element:<UserList/>
  },
  {
    path:"/news-manage/category",
    element:<UserList/>
  },
  // 审核管理
  {
    path:"/audit-manage",
    element:<Nopermission/>
  },
  {
    path:"/audit-manage/audit",
    element:<Nopermission/>
  },
  {
    path:"/audit-manage/list",
    element:<Nopermission/>
  },
  // 发布管理
  {
    path:"/publish-manage",
    element:<Nopermission/>
  },
  {
    path:"/publish-manage/unpublished",
    element:<Nopermission/>
  },
  {
    path:"/publish-manage/published",
    element:<Nopermission/>
  },
  {
    path:"/publish-manage/sunset",
    element:<Nopermission/>
  },
  // 不存在页面
  {
    path:'*',
    element:<Nopermission/>
  },
  // 重定向
  {
    path:'/',
    element:<Navigate to = '/home'/>
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
