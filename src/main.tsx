import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, redirect, RouteObject, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.tsx'

import '@fontsource/poppins/100.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';

import '@fontsource/poppins/100-italic.css';
import '@fontsource/poppins/400-italic.css';
import '@fontsource/poppins/700-italic.css';
import { Auth0Provider } from '@auth0/auth0-react'
import Profile from './pages/Pofile.tsx'

const routeObject : RouteObject[] = [
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  {
    path: "/profile",
    element: <Profile/>
  }
]

const router = createBrowserRouter(routeObject)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider 
      domain={import.meta.env.VITE_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH_AUDIENCE,
        scope: import.meta.env.VITE_AUTH_SCOPE
      }}
      >
      <RouterProvider router={router}/>
    </Auth0Provider>
  </React.StrictMode>,
)
