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
import useCart from '../cart/hooks/useCart';

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
    drawer,
    handleToggleFavorite,
    favoritesIds,
    profileImage,
  } = useHomeScreen();

  const { handleToggleAddToCart, cartItemIds, cartQuantities, handleIncrement, handleDecrement } = useCart();

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
          onAddToCart={handleToggleAddToCart}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          isInCart={cartItemIds.has(item.id)}
          quantity={cartQuantities.get(item.id) ?? 0}
          isFavorite={favoritesIds.has(item.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      </Animated.View>
    ),
    [
      handelPress,
      favoritesIds,
      handleToggleFavorite,
      handleToggleAddToCart,
      handleIncrement,
      handleDecrement,
      cartItemIds,
      cartQuantities,
    ],
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
          onAddToCart={handleToggleAddToCart}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onPress={handelPress}
          isFavorite={favoritesIds.has(item.id)}
          onToggleFavorite={handleToggleFavorite}
          isInCart={cartItemIds.has(item.id)}
          quantity={cartQuantities.get(item.id) ?? 0}
        />
      </Animated.View>
    ),
    [
      handleToggleFavorite,
      favoritesIds,
      handelPress,
      handleToggleAddToCart,
      cartItemIds,
    ],
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
        imageUrl={profileImage}
        showCart
        onCartPress={() => {
          drawer.navigate('cartScreen');
        }}
        onProfilePress={() => {
          drawer.openDrawer();
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
  container: { flex: 1, backgroundColor: '#F7F4EF' },
  centered: {
    flex: 1,
    backgroundColor: '#F7F4EF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  verticalList: { paddingHorizontal: 16, paddingBottom: 40 },
  horizontalList: { paddingVertical: 8, paddingRight: 16 },
  sectionTitle: {
    fontSize: 22,
    fontFamily: 'Cairo-Bold',
    color: '#1A1A2E',
    marginTop: 24,
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  loadingText: {
    marginTop: 14,
    fontSize: 15,
    fontFamily: 'Cairo-Regular',
    color: '#8A7F72',
  },
  errorTitle: {
    fontSize: 20,
    fontFamily: 'Cairo-SemiBold',
    color: '#1A1A2E',
    marginTop: 16,
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#8A7F72',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#C8863A',
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 14,
    shadowColor: '#C8863A',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  retryText: {
    fontSize: 15,
    fontFamily: 'Cairo-SemiBold',
    color: '#fff',
  },
});
