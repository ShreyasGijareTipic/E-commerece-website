import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './filterslice';

export const store = configureStore({
  reducer: {
    filters: filterReducer,
  },
});
