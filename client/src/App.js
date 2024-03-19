import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Home from './Pages/Home/Home.jsx';
import List from './Pages/List/List.jsx';
import Hotel from './Pages/Hotel/Hotel.jsx';
import Login from './Pages/login/Login.jsx';
function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/hotels' element={<List/>}/>
    <Route path='/hotels/:id' element={<Hotel/>}/>
    <Route path="/login" element={<Login/>}/>
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
