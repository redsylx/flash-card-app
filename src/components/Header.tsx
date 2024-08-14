import { Home, PlayArrow, LibraryBooks, Logout } from '@mui/icons-material';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUsername } from '../reducers/user';
import { useCardAuth } from '../hooks/HookCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../routes';
import { RootState } from '../store';

interface IconContainerProps {
    children: ReactElement;
    isActive?: boolean;
    isDisabled?: boolean;
  }
  

const IconContainer : React.FC<IconContainerProps> = ({ children, isActive = false, isDisabled = false}) => {
    const [isHovered, setIsHovered] = useState(false);
    const handleMouseEnter = () => {
        setIsHovered(true);
      };
    
      const handleMouseLeave = () => {
        setIsHovered(false);
      };

    const childWithProps = React.cloneElement(children, {
        className: `${isHovered ? 'custom-icon-hover' : isActive ? 'custom-icon-active' : 'custom-icon'}`,
      });
    return (
        <div className={`${isHovered ? 'custom-icon-container-hover' : isActive ? 'custom-icon-container-active' : 'custom-icon-container'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {childWithProps}
        </div>
    )
}

export default () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const cardAuth = useCardAuth();
    const navigate = useNavigate();
    const username = useSelector((state: RootState) => state.user.username)
    const { logout: auth0Logout } = useAuth0();
  
    useEffect(() => {
        const authenticate = async () => {
            const { username } = await cardAuth();
            if(!username) navigate("/auth");
            dispatch(setUsername(username || ''));
        };
        authenticate();
    }, []);
    const navigateRoute = (route : string) => {
        if (route === location.pathname) return
        navigate(route);
    }
    const logout = () => auth0Logout({ logoutParams: { returnTo: window.location.origin } })

    return (
        <header className="flex justify-between items-center py-4 custom-header">
            <div className="flex items-centerm custom-page">
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
                <p className='text-2xl text-sub mr-4'>{username ? username : '. . .'}</p>
                <div onClick={logout}>
                    <IconContainer>
                        <Logout/>
                    </IconContainer>
                </div>
            </div>
        </header>
    );
}