import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Chatbot />
      <Routes>
        <Route path="/"       element={<Home />} />
        <Route path="/menu"   element={<Menu />} />
        <Route path="/cart"   element={<Cart />} />
        <Route path="/login"  element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin"  element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;