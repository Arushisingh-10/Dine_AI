import { Link, useLocation } from 'react-router-dom';
import logo from './dine-ai-logo.svg';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const location = useLocation();
  const { darkMode, toggleDark } = useTheme();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/menu',    label: 'Menu',    emoji: '🍽️' },
    { path: '/cart',    label: 'Cart',    emoji: '🛒' },
    { path: '/scanner', label: 'Scanner', emoji: '📸' },
    { path: '/reviews', label: 'Reviews', emoji: '⭐' },
    { path: '/login',   label: 'Login',   emoji: '👤' },
    { path: '/admin',   label: 'Admin',   emoji: '⚙️' },
  ];

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      background: darkMode ? 'rgba(15, 15, 26, 0.95)' : 'rgba(26, 26, 46, 0.85)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      boxShadow: '0 4px 30px rgba(0,0,0,0.3)',
      padding: '10px 28px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    }}>

      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', marginRight: 'auto' }}>
        <img src={logo} alt="Dine AI Logo" style={{ width: '52px', height: '52px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }}/>
        <span style={{ color: 'white', fontWeight: '900', fontSize: '22px', letterSpacing: '1px' }}>
          Dine <span style={{ color: '#FFD700' }}>AI</span>
        </span>
      </Link>

      {/* Nav Links */}
      {navLinks.map(link => (
        <Link key={link.path} to={link.path}
          style={{
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: '30px',
            fontWeight: '700',
            fontSize: '14px',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: isActive(link.path) ? 'linear-gradient(135deg, #8B0000, #FF6B35)' : 'transparent',
            color: isActive(link.path) ? 'white' : 'rgba(255,255,255,0.7)',
            border: isActive(link.path) ? 'none' : '1px solid transparent',
          }}
          onMouseEnter={e => {
            if (!isActive(link.path)) {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.2)';
            }
          }}
          onMouseLeave={e => {
            if (!isActive(link.path)) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
              e.currentTarget.style.border = '1px solid transparent';
            }
          }}>
          <span>{link.emoji}</span>
          {link.label}
        </Link>
      ))}

      {/* Dark Mode Toggle */}
      <button onClick={toggleDark}
        style={{
          marginLeft: '8px',
          background: darkMode ? '#FFD700' : 'rgba(255,255,255,0.1)',
          border: 'none',
          borderRadius: '30px',
          padding: '8px 16px',
          cursor: 'pointer',
          fontSize: '18px',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: darkMode ? '#1A1A2E' : 'white',
          fontWeight: '700',
          fontSize: '13px',
        }}>
        {darkMode ? '☀️ Light' : '🌙 Dark'}
      </button>
    </nav>
  );
}