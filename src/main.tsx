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
import Profile from './pages/Pofile.tsx'
import Auth from './pages/Auth.tsx'
import { Provider } from 'react-redux';
import store from './store';

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
  },
  {
    path: "/auth",
    element: <Auth/>
  }
]

const router = createBrowserRouter(routeObject)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div className="px-[15%]">
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
