import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <CartProvider>
      <App />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1A1A2E',
            color: '#fff',
            fontWeight: '600',
            borderRadius: '16px',
            padding: '12px 20px',
          },
          success: {
            iconTheme: { primary: '#FF6B35', secondary: '#fff' }
          },
          error: {
            iconTheme: { primary: '#8B0000', secondary: '#fff' }
          }
        }}
      />
    </CartProvider>
  </ThemeProvider>
);