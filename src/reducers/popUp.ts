import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopUpSate {
  isOpen: boolean;
}

const initialState: PopUpSate = {
    isOpen: true,
};

const popUpSlice = createSlice({
  name: 'popUp',
  initialState,
  reducers: {
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
  },
});

export const { setIsOpen } = popUpSlice.actions;
export default popUpSlice.reducer;