import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './routes/router.jsx'
import AOS from 'aos';
import 'aos/dist/aos.css';
import AuthProvider from './context/AuthProvider/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'


AOS.init({
  duration: 800,
  offset: 80,
  once: true,
});

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
      <Toaster></Toaster>
    </QueryClientProvider>
  </StrictMode>,
)
