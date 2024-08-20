import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, RootState } from './store'
import { useEffect, useState } from 'react'
import { auth, getIdToken } from './firebase'
import { ROUTES } from './routes'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { serviceAuthGet } from './services/ServiceAuth'
import { setUserId, setUsername } from './reducers/user'

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore

export const useFirebaseAuthentication = () => {
    const [token, setToken] = useState<string>("");
    useEffect(() =>{
        return () => {
            auth.currentUser?.getIdToken().then(p => setToken(p)).catch(e => console.error(e));
            if(!token) window.location.href = ROUTES.LOGIN;
        }
    }, []);
    return token
};

export const useAuthState = () => {
    const [authReady, setAuthReady] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate(ROUTES.LOGIN);
            } else {
                setAuthReady(true);
            }
        });
        return () => unsubscribe();
    }, []);

    return authReady;
};

export const useFetchUser = (authReady: boolean) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (!authReady) return;
        const getUser = async () => {
            try {
            const token = await getIdToken();
            const response = await serviceAuthGet(token);
            const { username, id } = await response.json();

            dispatch(setUserId(id));
            dispatch(setUsername(username));
            } catch (error) {
            console.error('Error fetching user data:', error);
            }
        };
        getUser();
    }, [authReady]);
};