import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/Routes.jsx';
import { ToastContainer, Zoom } from 'react-toastify';
import AuthProvider from '../providers/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { HelmetProvider } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';
import '@smastrom/react-rating/style.css';
import './index.css';
import "aos/dist/aos.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <HelmetProvider> */}
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthProvider>
      </QueryClientProvider>
    {/* </HelmetProvider> */}

    {/* React Toastify */}
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Zoom}
    />
  </React.StrictMode>,
)
