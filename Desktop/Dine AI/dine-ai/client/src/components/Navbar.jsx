import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav style={{ display:'flex', gap:'20px', padding:'16px', background:'#ff6b35', color:'white' }}>
      <Link to="/"      style={{ color:'white', textDecoration:'none', fontWeight:'bold', fontSize:'20px' }}>🍽️ Dine AI</Link>
      <Link to="/menu"  style={{ color:'white', textDecoration:'none' }}>Menu</Link>
      <Link to="/cart"  style={{ color:'white', textDecoration:'none' }}>Cart</Link>
      <Link to="/login" style={{ color:'white', textDecoration:'none' }}>Login</Link>
      <Link to="/scanner" style={{ color:'white', textDecoration:'none' }}>Scanner</Link>
    </nav>
  );
}