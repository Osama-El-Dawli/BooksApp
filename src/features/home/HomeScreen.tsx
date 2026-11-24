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
import { useCallback, useEffect, useMemo } from 'react';
import { Book } from './types/bookType';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import CustomHeader from '../../components/CustomHeader';
import useHomeScreen from './hooks/useHomeScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export default function HomeScreen() {
  const {
    allBooks,
    handelPress,
    retry,
    featuredBooks,
    isLoading,
    error,
    navigation,
    handleToggleFavorite,
    favoritesIds,
  } = useHomeScreen();

  const featuredBooksItems = useCallback(
    ({ item, index }: { item: Book; index: number }) => (
      <Animated.View
        entering={FadeInRight.springify()
          .damping(20)
          .duration(600)
          .delay(100 * index)}
      >
        <BookCard
          book={item}
          variant="compact"
          onPress={handelPress}
          isFavorite={favoritesIds.has(item.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      </Animated.View>
    ),
    [handelPress, favoritesIds, handleToggleFavorite],
  );

  const allBooksItems = useCallback(
    ({ item, index }: { item: Book; index: number }) => (
      <Animated.View
        entering={FadeInDown.springify()
          .damping(20)
          .duration(600)
          .delay(index * 100)}
      >
        <BookCard
          book={item}
          variant="row"
          onPress={handelPress}
          isFavorite={favoritesIds.has(item.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      </Animated.View>
    ),
    [handleToggleFavorite, favoritesIds, handelPress],
  );

  const keyExtractor = useCallback((item: Book) => item.id, []);

  const Header = useMemo(
    () => (
      <View>
        <SectionTitle>Featured</SectionTitle>
        <FlatList
          horizontal
          data={featuredBooks}
          keyExtractor={keyExtractor}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          renderItem={featuredBooksItems}
        />

        <SectionTitle>All Books</SectionTitle>
      </View>
    ),
    [featuredBooks, keyExtractor, featuredBooksItems],
  );

  if (isLoading && allBooks.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
        <Text style={styles.loadingText}>Loading books...</Text>
      </SafeAreaView>
    );
  }

  if (error && allBooks.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <Icon name="error-outline" size={48} color="#ef4444" />
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={retry}>
          <Text style={styles.retryText}>Try Again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Discover Books"
        showProfile
        onProfilePress={() => {
          navigation.navigate('profileScreen');
        }}
      />
      <FlatList
        data={allBooks}
        keyExtractor={keyExtractor}
        ListHeaderComponent={Header}
        contentContainerStyle={styles.verticalList}
        showsVerticalScrollIndicator={false}
        renderItem={allBooksItems}
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
