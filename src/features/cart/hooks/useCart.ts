import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { Book } from '../../home/types/bookType';
import {
  toggleAddToCart,
  incrementQuantity,
  decrementQuantity,
} from '../redux/cartSlice';

export default function useCart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(state => state.cart.cartItems);

  const cartItemIds = useMemo(
    () => new Set(cartItems.map(i => i.id)),
    [cartItems],
  );

  const cartQuantities = useMemo(() => {
    const map = new Map<string, number>();
    cartItems.forEach(i => map.set(i.id, i.quantity));
    return map;
  }, [cartItems]);

  const handleToggleAddToCart = useCallback(
    (book: Book) => {
      dispatch(toggleAddToCart(book));
    },
    [dispatch],
  );

  const handleIncrement = useCallback(
    (id: string) => {
      dispatch(incrementQuantity(id));
    },
    [dispatch],
  );

  const handleDecrement = useCallback(
    (id: string) => {
      dispatch(decrementQuantity(id));
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
    handleIncrement,
    handleDecrement,
    cartItemIds,
    cartQuantities,
    isInCart,
  };
}
