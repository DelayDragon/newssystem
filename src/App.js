
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes/IndexRouter'
import Home from './views/sendBox/home/Home';
import NewsSendBox from './views/sendBox/NewsSendBox';

function App() {
  const element = useRoutes(routes)
  // const element = useRoutes(routes)
  console.log(<Home/>)
  return (
    <div>
      {/* <NewsSendBox children={<Home/>}></NewsSendBox> */}
      {element} 
      {/* <Home/> */}
    </div>
  );
}

export default App;
