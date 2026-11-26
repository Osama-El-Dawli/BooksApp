import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootDrawerParamList, RootStackParamList } from '../../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useCallback, useEffect, useMemo } from 'react';
import { bookThunk } from '../redux/bookThunk';
import { Book } from '../types/bookType';
import { toggleFavorites } from '../redux/bookSlice';
import { DrawerNavigationProp } from '@react-navigation/drawer';

type drawerNav = DrawerNavigationProp<RootDrawerParamList>;
type stackNav = NativeStackNavigationProp<RootStackParamList>;

export default function useHomeScreen() {
  const stack = useNavigation<stackNav>();
  const drawer = useNavigation<drawerNav>();
  const dispatch = useAppDispatch();
  const { allBooks, featuredBooks, isLoading, error } = useAppSelector(
    state => state.books,
  );

  const profileImage = useAppSelector(state => state.profile.imageUrl);

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
    stack.navigate('bookDetails', { book: book });
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
    stack,
    drawer,
    favoritesIds,
    handleToggleFavorite,
    profileImage,
  };
}
