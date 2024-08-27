import { useAccount } from './store'
import { useEffect, useState } from 'react'
import { getIdToken } from './firebase'
import { serviceAuthGet } from './services/ServiceAuth'
import IAccount from './interfaces/IAccount'

export const useFetchUser = (authReady: boolean) => {
    const { setAccount } = useAccount();
    const [ finish, setFinish ] = useState(false);
    useEffect(() => {
        if (!authReady) return;
        const getUser = async () => {
            try {
            const token = await getIdToken();
            if(!token) {
                setFinish(true);
                return
            }
            const response = await serviceAuthGet(token);
            setAccount((await response.json()) as IAccount);
            } catch (error) {
            console.error('Error fetching user data:', error);
            } finally {
                setFinish(true)
            }
        };
        getUser();
    }, [authReady]);
    return finish;
};