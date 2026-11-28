import { StyleSheet } from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import useCart from './hooks/useCart';
import Animated, {
  FadeInDown,
  FadeOutRight,
  LinearTransition,
} from 'react-native-reanimated';
import BookCard from '../home/components/BookCard';
import { CartItem } from './redux/cartSlice';
import EmptyItems from '../../components/EmptyItems';

type nav = NativeStackNavigationProp<RootStackParamList>;

export default function CartScreen() {
  const navigation = useNavigation<nav>();
  const {
    cartItems,
    cartItemIds,
    cartQuantities,
    handleToggleAddToCart,
    handleIncrement,
    handleDecrement,
  } = useCart();

  const cartBooks = useCallback(
    ({ item, index }: { item: CartItem; index: number }) => (
      <Animated.View
        entering={FadeInDown.springify()
          .damping(20)
          .duration(600)
          .delay(index * 100)}
        exiting={FadeOutRight.duration(300)}
      >
        <BookCard
          book={item}
          showFav={false}
          isInCart={cartItemIds.has(item.id)}
          quantity={cartQuantities.get(item.id) ?? 0}
          onAddToCart={handleToggleAddToCart}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          variant="row"
          onPress={book => navigation.navigate('bookDetails', { book })}
        />
      </Animated.View>
    ),
    [
      navigation,
      cartItemIds,
      cartQuantities,
      handleToggleAddToCart,
      handleIncrement,
      handleDecrement,
    ],
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F4EF' }}>
      <CustomHeader
        title="My Cart"
        showBack
        onBack={() => navigation.goBack()}
      />
      {cartItems.length === 0 ? (
        <EmptyItems
          title="No items in cart yet"
          subTitle="Tap the cart Icon on any book to save it here."
          icon="shopping-cart"
        />
      ) : (
        <Animated.FlatList
          itemLayoutAnimation={LinearTransition.duration(300)}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          data={cartItems}
          renderItem={cartBooks}
          keyExtractor={(item: CartItem) => item.id}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
});
