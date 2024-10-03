import './App.css';
import { BrowserRouter,Route, Routes } from 'react-router-dom'; 
import Login from './pages/Login/Index';
import Documentacao from './pages/doc/Index';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/docs" element={<Documentacao />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
