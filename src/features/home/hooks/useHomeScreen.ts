import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useCallback, useEffect, useMemo } from 'react';
import { bookThunk } from '../redux/bookThunk';
import { Book } from '../types/bookType';
import { toggleFavorites } from '../redux/bookSlice';

type nav = NativeStackNavigationProp<RootStackParamList>;

export default function useHomeScreen() {
  const navigation = useNavigation<nav>();
  const dispatch = useAppDispatch();
  const { allBooks, featuredBooks, isLoading, error } = useAppSelector(
    state => state.books,
  );

  const favorites = useAppSelector(state => state.books.favorites);
  const favoritesIds = useMemo(
    () => new Set(favorites.map(item => item.id)),
    [favorites],
  );
  const handleToggleFavorite = useCallback(
    (book: Book) => {
      dispatch(toggleFavorites(book));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(bookThunk('all'));
    dispatch(bookThunk('featured'));
  }, []);

  const handelPress = useCallback((book: Book) => {
    navigation.navigate('bookDetails', { book: book });
  }, []);

  const retry = useCallback(() => {
    dispatch(bookThunk('all'));
    dispatch(bookThunk('featured'));
  }, [dispatch]);

  return {
    allBooks,
    handelPress,
    retry,
    featuredBooks,
    isLoading,
    error,
    navigation,
    favoritesIds,
    handleToggleFavorite,
  };
}
