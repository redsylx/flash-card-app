import { Home, PlayArrow, LibraryBooks, Logout } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUsername } from '../reducers/user';
import { serviceAuthGet } from '../services/ServiceAuth';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../routes';
import { RootState } from '../store';
import { IconContainer } from './CustomIcon';
import { auth } from '../firebase';

export default () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector((state: RootState) => state.user.username)
    const [ jwt, setJwt] = useState('');
  
    useEffect(() => {
        const authenticate = async () => {
            const token = await auth.currentUser?.getIdToken();
            if (token) {
                setJwt(token);
                const res = await serviceAuthGet(token);
                if(!res.ok) alert(res);
                const { username } = await res.json();
                if(!username) navigate("/auth");
                dispatch(setUsername(username));
            }
        };
        authenticate();
    }, []);
    const navigateRoute = (route : string) => {
        if (route === location.pathname) return
        navigate(route);
    }
    const logout = () => auth0Logout({ logoutParams: { returnTo: window.location.origin } })

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
                <p className='custom-text-1 text-sub mr-4'>{username ? username : '. . .'}</p>
                <div onClick={logout}>
                    <IconContainer>
                        <Logout/>
                    </IconContainer>
                </div>
            </div>
        </header>
    );
}