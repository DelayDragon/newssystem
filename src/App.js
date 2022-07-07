
import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes/IndexRouter'

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
