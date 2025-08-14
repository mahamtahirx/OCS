import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx';
import { NotificationProvider } from './Context/NotificationContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <App />
        </NotificationProvider>
    </AuthProvider>
  </StrictMode>,
)
