import { Home, PlayArrow, LibraryBooks, Logout } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../routes';
import { IconContainer } from './CustomIcon';
import { auth } from '../firebase';
import { useAppSelector } from '../hooks';

export default () => {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useAppSelector(p => p.user);

    const navigateRoute = (route : string) => {
        if (route === location.pathname) return
        navigate(route);
    }

    const logout = () => {
        auth.signOut().then(() => navigate(ROUTES.BASE));
    }

    return (
        <header className="flex justify-between items-center py-4 custom-header custom-page">
            <div className="flex items-center">
                <div className='mr-4' onClick={() => navigateRoute(ROUTES.HOME)}>
                    <IconContainer isActive={location.pathname == ROUTES.HOME}>
                        <Home/>
                    </IconContainer>
                </div>
                <div className='mr-4' onClick={() => navigateRoute(ROUTES.GAME)}>
                    <IconContainer isActive={location.pathname == ROUTES.GAME}>
                        <PlayArrow/>
                    </IconContainer>
                </div>
                <div className='mr-4' onClick={() => navigateRoute(ROUTES.LIBRARY)}>
                    <IconContainer isActive={location.pathname == ROUTES.LIBRARY}>
                        <LibraryBooks/>
                    </IconContainer>
                </div>
            </div>
            <div className="flex items-center">
                <p className='custom-text-1 text-sub mr-4'>{user.username ? user.username : '. . .'}</p>
                <div onClick={logout}>
                    <IconContainer>
                        <Logout/>
                    </IconContainer>
                </div>
            </div>
        </header>
    );
}