import { createSlice } from '@reduxjs/toolkit';
import { BooksState } from '../types/bookType';
import { bookThunk } from './bookThunk';

const initialState: BooksState = {
  allBooks: [],
  featuredBooks: [],
  error: null,
  isLoading: false,
};

const BookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(bookThunk.fulfilled, (state, action) => {
        if (action.meta.arg === 'featured') {
          state.isLoading = false;
          state.error = null;
          state.featuredBooks = action.payload;
        } else {
          state.isLoading = false;
          state.error = null;
          state.allBooks = action.payload;
        }
      })
      .addCase(bookThunk.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(bookThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ?? action.error.message ?? 'Failed to get books';
      });
  },
});

export default BookSlice.reducer;
