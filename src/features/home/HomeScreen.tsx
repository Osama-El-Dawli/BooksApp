import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BookCard from './components/BookCard';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useEffect } from 'react';
import { bookThunk } from './redux/bookThunk';
import Icon from 'react-native-vector-icons/MaterialIcons';

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const {
    allBooks,
    featuredBooks,
    isLoading,
    error,
  } = useAppSelector(state => state.books);

  useEffect(() => {
    dispatch(bookThunk('all'));
    dispatch(bookThunk('featured'));
  }, []);

  const Header = (
    <View>
      <View style={styles.header}>
        <Text style={styles.heading}>Discover Books</Text>
      </View>

      <SectionTitle>Featured</SectionTitle>
      <FlatList
        horizontal
        data={featuredBooks}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        renderItem={({ item }) => (
          <BookCard
            variant="compact"
            title={item.title}
            author={item.author}
            rating={item.rating}
            cover={item.cover}
            onPress={() => console.log('Pressed', item.title)}
          />
        )}
      />

      <SectionTitle>All Books</SectionTitle>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading books...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.centered}>
        <Icon name="error-outline" size={48} color="#ef4444" />
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <Pressable
          style={styles.retryButton}
          onPress={() => dispatch(bookThunk('all'))}
        >
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={allBooks}
        keyExtractor={item => item.id}
        ListHeaderComponent={Header}
        contentContainerStyle={styles.verticalList}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BookCard
            variant="row"
            title={item.title}
            subtitle={item.subtitle}
            author={item.author}
            rating={item.rating}
            cover={item.cover}
            onPress={() => console.log('Pressed', item.title)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eee' },
  centered: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  verticalList: { paddingHorizontal: 20, paddingBottom: 30 },
  horizontalList: { paddingVertical: 6, paddingRight: 20 },
  header: { marginTop: 20, marginBottom: 10 },
  heading: {
    fontSize: 30,
    fontFamily: 'Cairo-Bold',
    color: '#000',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-SemiBold',
    color: '#000',
    marginTop: 18,
    marginBottom: 12,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    fontFamily: 'Cairo-Regular',
    color: '#6b7280',
  },
  errorTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-SemiBold',
    color: '#111',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#000',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryText: {
    fontSize: 15,
    fontFamily: 'Cairo-SemiBold',
    color: '#fff',
  },
});
