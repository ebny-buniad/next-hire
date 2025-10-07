import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/router.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './context/AuthProvider/AuthProvider.jsx'


AOS.init({
  duration: 800,
  offset: 80,
  once: true,
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
