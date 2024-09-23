import { Home, PlayArrow, LibraryBooks, Logout, Store, Menu } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../routes';
import { IconContainer } from './IconContainer';
import { auth, getIdToken } from '../firebase';
import { useAccount } from '../store';
import { useEffect, useState } from 'react';
import { serviceAuthGet } from '../services/ServiceAuth';
import IAccount from '../interfaces/IAccount';

export default () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { account, refresh, setAccount } = useAccount();
    const [showMenu, setShowMenu] = useState(false);

    const navigateRoute = (route: string) => {
        if (route === location.pathname) return
        navigate(route);
    }

    const logout = () => {
        auth.signOut().then(() => navigate(ROUTES.BASE));
    }

    const getUser = async () => {
        const token = await getIdToken();
        const resAccount = (await (await serviceAuthGet(token)).json()) as IAccount;
        setAccount(resAccount);
    }

    useEffect(() => {
        getUser();
    }, [refresh]);

    return (
        <header className="flex justify-between items-center py-4 custom-header custom-page">
            <div className="flex items-center">
                <div className='mr-4' onClick={() => navigateRoute(ROUTES.HOME)}>
                    <IconContainer isActive={location.pathname == ROUTES.HOME}>
                        <Home />
                    </IconContainer>
                </div>
                <div className='mr-4' onClick={() => navigateRoute(ROUTES.GAME)}>
                    <IconContainer isActive={location.pathname == ROUTES.GAME}>
                        <PlayArrow />
                    </IconContainer>
                </div>
                <div className='mr-4' onClick={() => navigateRoute(ROUTES.LIBRARY)}>
                    <IconContainer isActive={location.pathname == ROUTES.LIBRARY}>
                        <LibraryBooks />
                    </IconContainer>
                </div>
                <div className='mr-4' onClick={() => navigateRoute(ROUTES.STORE)}>
                    <IconContainer isActive={location.pathname == ROUTES.STORE}>
                        <Store />
                    </IconContainer>
                </div>
            </div>
            <div className='hidden md:flex items-center'>
                <p className='custom-text-1 text-sub font-bold mr-2'>{account.point}</p>
                <p className='custom-text-1 text-sub mr-4'>points</p>
                <p className='custom-text-1 text-sub mr-4'>{account.username ? account.username : '. . .'}</p>
                <div onClick={logout}>
                    <IconContainer>
                        <Logout />
                    </IconContainer>
                </div>
            </div>
            <div className="flex md:hidden">
                <div onClick={() => setShowMenu(!showMenu)}>
                <IconContainer>
                    <Menu />
                </IconContainer>
                </div>
                { showMenu && (
                    <div className="p-4 absolute right-4 top-10 z-20 mt-8 bg-sub-alt border-2 border-sub rounded-xl min-w-[100px]">
                    <p className='custom-text-1 text-sub font-bold mr-4 mb-2'>{account.username ? account.username : '. . .'}</p>
                    <p className='custom-text-1 text-sub font-bold mr-2 mb-2'>{account.point} pts</p>
                    <div onClick={logout}>
                        <p className='custom-text-1 text-error-1 font-bold'>Logout</p>
                    </div>
                </div>
                )}
            </div>
        </header>
    );

}