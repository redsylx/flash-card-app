import { configureStore, Store } from '@reduxjs/toolkit';
import userReducer from './reducers/user';

export const store : Store = configureStore({
  reducer: {
    user: userReducer
  },
});

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']