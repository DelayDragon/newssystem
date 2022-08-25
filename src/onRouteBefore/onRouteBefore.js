const onRouteBefore = ({ pathname, meta }) => {
    // 示例：判断未登录跳转登录页
    if (meta.needLogin) {
      if (localStorage.getItem('token')===null) {
        return '/login'
      }
    }

  }
  
  export default onRouteBefore