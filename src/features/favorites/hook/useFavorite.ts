import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { useCallback } from 'react';
import { toggleFavorites } from '../../home/redux/bookSlice';
import { RootStackParamList } from '../../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Book } from '../../home/types/bookType';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function useFavoriteHook() {
  const navigation = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.books.favorites);

  const handleToggle = useCallback(
    (book: Book) => dispatch(toggleFavorites(book)),
    [dispatch],
  );

  const handleBookPress = useCallback(
    (book: Book) => navigation.navigate('bookDetails', { book }),
    [navigation],
  );
  return {favorites, navigation, handleBookPress, handleToggle};
}
