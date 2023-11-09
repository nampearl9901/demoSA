
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import { routes } from './routes/routes';



function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        {routes.map(({ path, component }, index) => {
          return <Route key={index} path={path} element={component} />;
        })}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
