
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes/IndexRouter'
import Home from './views/sendBox/home/Home';
import NewsSendBox from './views/sendBox/NewsSendBox';
import Interceptor from './components/interceptor/Interceptor.js';

function App() {
  const element = useRoutes(routes)
  return (
    <div>
      {/* <Interceptor> */}
        {element}
      {/* </Interceptor> */}
    </div>
  );
}

export default App;
