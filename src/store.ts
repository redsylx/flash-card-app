import { configureStore, Store } from '@reduxjs/toolkit';
import userReducer from './reducers/user';

const store : Store = configureStore({
    reducer: {
      user: userReducer
    },
  });

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;