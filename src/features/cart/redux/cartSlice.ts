import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from '../../home/types/bookType';

export type CartItem = Book & { quantity: number };

const initialState = {
  cartItems: [] as CartItem[],
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
        state.cartItems.push({ ...book, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cartItems.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const idx = state.cartItems.findIndex(i => i.id === action.payload);
      if (idx === -1) return;
      if (state.cartItems[idx].quantity <= 1) {
        state.cartItems.splice(idx, 1);
      } else {
        state.cartItems[idx].quantity -= 1;
      }
    },
  },
});

export const { toggleAddToCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
