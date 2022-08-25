
import './App.css';
import { useRoutes,useNavigate } from 'react-router-dom';
import routes from './routes/IndexRouter'
import RouterWaiter from 'react-router-waiter'
import onRouteBefore from './onRouteBefore/onRouteBefore'
import { useEffect } from 'react';

function App() { 
  // const {username}= JSON.parse(localStorage.getItem('token'))
  // useEffect(()=>{
  //   if(username=null){
  //     navigate('login')
  //   }
  // },[username])
  const element = useRoutes(routes)
  const navigate = useNavigate()
 
  console.log(localStorage.getItem('token'))
  return (
    <div>
      {/* <RouterWaiter routes={routes} onRouteBefore={onRouteBefore} /> */}
      {/* <Interceptor> */}
        {element}
      {/* </Interceptor> */}
    </div>
  );
}

export default App;
