
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Single from './pages/single/Single';
import New from './pages/new/New';
import List from "./pages/list/List"
import { userInputs, productInputs } from './formSource';
import "./style/dark.scss"
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';


function App() {

  const { darkMode } = useContext(DarkModeContext)


  const ProtectedRoot = ({ children }) => {
    const { user } = useContext(AuthContext)
    if (!user) {
      return <Navigate to="/login" />
    }
    return children;
  };



  return (

    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <ProtectedRoot><Home /></ProtectedRoot>} />
          <Route path='/login' element={<Login />} />
          <Route path="/users" element={<ProtectedRoot><List /> </ProtectedRoot>} />
          <Route path='/users/:userId' element={<ProtectedRoot><Single /> </ProtectedRoot>} />
          <Route path='/users/new' element={<ProtectedRoot><New inputs={userInputs} title="ADD NEW USER BY RAJA" /> </ProtectedRoot>} />
          <Route path='/products' element={<ProtectedRoot><List /> </ProtectedRoot>} />
          <Route path='/products/:productId' element={<ProtectedRoot><Single /> </ProtectedRoot>} />
          <Route path='/products/new' element={<ProtectedRoot><New inputs={productInputs} title="ADD NEW PRODUCT BY RAJA" /> </ProtectedRoot>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
