
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes/IndexRouter'
import Home from './views/sendBox/home/Home';
import NewsSendBox from './views/sendBox/NewsSendBox';

function App() {
  const element = useRoutes(routes)
  return (
    <div>
      {element} 
    </div>
  );
}

export default App;
