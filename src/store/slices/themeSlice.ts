import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IThemeState, Theme } from '../../model/store/themeSlice';

const initialState: IThemeState = {
  theme: Theme.dark,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
  },
});

export const selectTheme = (state: RootState) => state.theme.theme;

export const { setTheme } = themeSlice.actions;
export default themeSlice;
