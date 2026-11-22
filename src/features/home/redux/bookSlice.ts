import { createSlice } from '@reduxjs/toolkit';
import { BooksState } from '../types/bookType';
import { bookThunk } from './bookThunk';

const initialState: BooksState = {
  allBooks: [],
  featuredBooks: [],
  favorites: [],
  error: null,
  isLoading: false,
};

const BookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    toggleFavorites: (state, action) => {
      const book = action.payload;
      const exist = state.favorites.some(item => item.id === book.id);

      if (exist) {
        state.favorites = state.favorites.filter(item => item.id !== book.id);
      } else {
        state.favorites.push(book);
      }
    },
  },
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

export const { toggleFavorites } = BookSlice.actions;
export default BookSlice.reducer;
