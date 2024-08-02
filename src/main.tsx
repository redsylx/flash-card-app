import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.tsx'

import '@fontsource/poppins/100.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';

import '@fontsource/poppins/100-italic.css';
import '@fontsource/poppins/400-italic.css';
import '@fontsource/poppins/700-italic.css';

const routeObject : RouteObject[] = [
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  }
]

const router = createBrowserRouter(routeObject)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
