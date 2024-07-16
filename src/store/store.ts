import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';

const rootReducer = combineReducers({
  theme: themeReducer.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export default store;
