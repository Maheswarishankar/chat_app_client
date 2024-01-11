
import './App.css';

import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Chats from './Pages/Chats';

export const URL = "https://chat-app-server-zmkz.onrender.com";

function App() {
  return (
    <div className="App">      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/singup' element={<Signup />} />
        <Route path='/chats' element={<Chats />} />
      </Routes>
    </div>
  );
}

export default App;
