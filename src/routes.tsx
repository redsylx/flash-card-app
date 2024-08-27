import { createBrowserRouter, RouteObject } from "react-router-dom";
import Index from './pages/index'
import Home from './pages/home/index'
import Login from './pages/Login'
import Auth from './pages/Auth'

export const ROUTES = {
    AUTH: '/auth',
    HOME: '/home',
    HOME2: '/home2',
    GAME: '/game',
    LIBRARY: '/library',
    LOGIN: '/login',
    BASE: '/'
};

const routeObject : RouteObject[] = [
  {
    path: ROUTES.BASE,
    element: <Index/>
  },
  {
    path: ROUTES.HOME,
    element: <Home/>
  },
  {
    path: ROUTES.LOGIN,
    element: <Login/>
  },
  {
    path: ROUTES.AUTH,
    element: <Auth/>
  },
]
  
export const router = createBrowserRouter(routeObject)