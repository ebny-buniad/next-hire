import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/router.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css';


AOS.init({
  duration: 800, 
  offset: 80, 
  once: true, 
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
