import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllBooks } from '../api/getAllBooks';
import { Book } from '../types/bookType';
import axios from 'axios';

export const bookThunk = createAsyncThunk<
  Book[],
  string,
  { rejectValue: string }
>('books/getAllBooks', async (query, { rejectWithValue }) => {
  try {
    return await getAllBooks(query);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.error?.message ??
          error.message ??
          'Failed to get books',
      );
    }
    return rejectWithValue('Something went wrong');
  }
});
