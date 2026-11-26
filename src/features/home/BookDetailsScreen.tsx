import { ScrollView, StyleSheet } from 'react-native';
import React, { useCallback } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomButton from '../../components/CustomButton';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import BookDetailsItem from './components/BookDetailsItem';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { toggleFavorites } from './redux/bookSlice';
import { Book } from './types/bookType';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function BookDetailsScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'bookDetails'>>();
  const { book } = route.params;
  const navigate = useNavigation<Nav>();
  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(state =>
    state.books.favorites.some(b => b.id === book.id),
  );
  const handleToggle = useCallback(
    (book: Book) => dispatch(toggleFavorites(book)),
    [dispatch],
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Book Details"
        showBack
        onBack={() => navigate.pop()}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <BookDetailsItem
          isFavorite={isFavorite}
          onToggleFavorite={handleToggle}
          book={book}
        />
      </ScrollView>
      <Animated.View
        entering={FadeInDown.delay(600).duration(500)}
        style={styles.buttonWrapper}
      >
        <CustomButton
          style={{}}
          text="Preview PDF"
          onPress={() => navigate.navigate('pdfView')}
        />
        <CustomButton
          style={{ margin: 16, marginBottom: 24 }}
          text="Preview"
          onPress={() =>
            navigate.navigate('bookWebView', {
              previewLink: book.previewLink,
              title: book.title,
            })
          }
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F4EF' },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  buttonWrapper: { alignSelf: 'stretch', marginTop: 24 },
});
