import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  username: string;
  email: string;
}

const initialState: UserState = {
  username: '',
  email: '',
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
    resetUser: (state) => {
      state.username = '';
      state.email = '';
    },
  },
});

export const { setUsername, setEmail, resetUser } = userSlice.actions;
export default userSlice.reducer;