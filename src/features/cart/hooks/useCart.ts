import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { Book } from '../../home/types/bookType';

export default function useCart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.cartItems);

  const handelAddToCart = useCallback(
    (book: Book) => {
      dispatch(addToCart(book));
    },
    [dispatch],
  );

  const handleRemoveFromCart = useCallback(
    (id: string) => {
      dispatch(removeFromCart(id));
    },
    [dispatch],
  );

  const isInCart = useCallback(
    (id: Book['id']) => cartItems.some(item => item.id === id),
    [cartItems],
  );

  return {
    cartItems,
    handleRemoveFromCart,
    handelAddToCart,
    isInCart,
  };
}
