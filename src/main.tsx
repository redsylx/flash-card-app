import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/LoginPage.tsx'

import '@fontsource/poppins/100.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/600.css';

import '@fontsource/poppins/100-italic.css';
import '@fontsource/poppins/300-italic.css';
import '@fontsource/poppins/600-italic.css';
import { Auth0Provider } from '@auth0/auth0-react'
import Home from './pages/Home.tsx'
import Auth from './pages/Auth.tsx'
import { Provider } from 'react-redux';
import store from './store';
import { ROUTES } from './routes.ts'
import Game from './pages/Game.tsx'
import Library from './pages/Library.tsx'

const routeObject : RouteObject[] = [
  {
    path: "/",
    element: <App/>
  },
  // {
  //   path: "/login",
  //   element: <LoginPage/>
  // },
  {
    path: ROUTES.AUTH,
    element: <Auth/>
  },
  {
    path: ROUTES.HOME,
    element: <Home/>
  },
  
  {
    path: ROUTES.GAME,
    element: <Game/>
  },
  {
    path: ROUTES.LIBRARY,
    element: <Library/>
  }
]

const router = createBrowserRouter(routeObject)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className="custom-app">
    <Auth0Provider 
      domain={import.meta.env.VITE_AUTH_DOMAIN}
      clientId={import.meta.env.VITE_AUTH_CLIENT_ID}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URL,
        audience: import.meta.env.VITE_AUTH_AUDIENCE,
        scope: import.meta.env.VITE_AUTH_SCOPE
      }}
      >
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
    </Auth0Provider>
  </div>
)
