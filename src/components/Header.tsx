import { Home, PlayArrow, LibraryBooks, Logout } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUsername } from '../reducers/user';
import { useCardAuth } from '../hooks/HookCard';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';

export default () => {
    const dispatch = useDispatch();
    const cardAuth = useCardAuth();
    const navigate = useNavigate();
    const username = useSelector((state: RootState) => state.user.username);
  
    useEffect(() => {
        const authenticate = async () => {
            const { username } = await cardAuth();
            if(!username) navigate("/auth");
            dispatch(setUsername(username || ''));
        };
        authenticate();
    }, []);

    return (
        <header className="flex justify-between items-center py-4">
            <div className="flex items-center">
                <div className="bg-sub-alt rounded-full p-2">
                    <Home className="text-main" />
                </div>
                <div className="bg-sub-alt rounded-full p-2 mx-4">
                    <PlayArrow className="text-purple-400" />
                </div>
                <div className="bg-sub-alt rounded-full p-2">
                    <LibraryBooks className="text-purple-400" />
                </div>
            </div>
            <div className="flex text-purple-400">
                <p className='text-lg mr-4'>{username}</p>
                <Logout className="text-purple-400" />
            </div>
        </header>
    );
}