import React from 'react';
import './App.scss';
import { useRoutes } from 'react-router-dom';
import { routes } from "./routes/routes";


function App() {
  const routing = useRoutes(routes)

  
  return (
    <div className="App">
           {routing}
    </div>
  );
}

export default App;
