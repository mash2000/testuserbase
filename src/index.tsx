import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';

// Импорт стилей с проверкой
try {
  require('./index.css');
  console.log('Styles loaded successfully');
} catch (error) {
  console.warn('Could not load index.css:', error);
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);