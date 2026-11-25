import { createSlice } from '@reduxjs/toolkit';
import { Book } from '../../home/types/bookType';
import { toggleFavorites } from '../../home/redux/bookSlice';

const initialState = {
  cartItems: [] as Book[],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleAddToCart: (state, action) => {
      const book = action.payload;
      const exist = state.cartItems.some(item => item.id === book.id);

      if (exist) {
        state.cartItems = state.cartItems.filter(item => item.id !== book.id);
      } else {
        state.cartItems.push(book);
      }
    },
  },
});

export const { toggleAddToCart } = cartSlice.actions;
export default cartSlice.reducer;
