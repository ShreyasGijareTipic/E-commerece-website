import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCategory: '',
  sortOrder: '',
  searchQuery: '',
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setCategory, setSortOrder, setSearchQuery } = filterSlice.actions;
export default filterSlice.reducer;
