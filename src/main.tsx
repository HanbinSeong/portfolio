// Safeguard against libraries attempting to reassign window.fetch
if (typeof window !== 'undefined') {
  const originalFetch = window.fetch;
  try {
    Object.defineProperty(window, 'fetch', {
      configurable: false,
      enumerable: true,
      get: () => originalFetch,
      set: () => {
        console.warn('An attempt to reassign window.fetch was blocked.');
      }
    });
  } catch (e) {
    // Already protected or environment doesn't support defineProperty on window
  }
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
