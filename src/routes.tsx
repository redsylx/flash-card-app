import { createBrowserRouter, RouteObject } from "react-router-dom";
import Index from './pages/index'
import Home from './pages/home/index'
import Login from './pages/Login'
import Auth from './pages/Auth'
import Game from "./pages/game";
import Play from "./pages/play";

export const ROUTES = {
    AUTH: '/auth',
    HOME: '/home',
    GAME: '/game',
    PLAY: '/play/:gameId',
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
  {
    path: ROUTES.GAME,
    element: <Game/>
  },
  {
    path: ROUTES.PLAY,
    element: <Play/>
  },
  
]
  
export const router = createBrowserRouter(routeObject)