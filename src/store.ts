import { configureStore, Store } from '@reduxjs/toolkit';
import userReducer from './reducers/user';
import popUpReducer from './reducers/popUp';

export const store : Store = configureStore({
  reducer: {
    user: userReducer,
    popUp: popUpReducer
  },
});

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']