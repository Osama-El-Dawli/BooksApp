import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { Book } from '../../home/types/bookType';
import { toggleAddToCart } from '../redux/cartSlice';

export default function useCart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.cartItems);

  const cartItemIds = useMemo(
    () => new Set(cartItems.map(i => i.id)),
    [cartItems],
  );

  const handleToggleAddToCart = useCallback(
    (book: Book) => {
      dispatch(toggleAddToCart(book));
    },
    [dispatch],
  );

  const isInCart = useCallback(
    (id: Book['id']) => cartItems.some(item => item.id === id),
    [cartItems],
  );

  return {
    cartItems,
    handleToggleAddToCart,
    cartItemIds,
    isInCart,
  };
}
