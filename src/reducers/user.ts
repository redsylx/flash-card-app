import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  email: string;
  id: string;
}

const initialState: UserState = {
  username: '',
  email: '',
  id: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    resetUser: (state) => {
      state.username = '';
      state.email = '';
      state.id = '';
    },
  },
});

export const { setUsername, setEmail, setUserId, resetUser } = userSlice.actions;
export default userSlice.reducer;