import { View, Text, FlatList, StyleSheet } from 'react-native';
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
import { Book } from '../home/types/bookType';
import EmptyItems from '../../components/EmptyItems';

type nav = NativeStackNavigationProp<RootStackParamList>;

export default function CartScreen() {
  const navigation = useNavigation<nav>();
  const { cartItems, cartItemIds, handleToggleAddToCart } = useCart();

  const cartBooks = useCallback(
    ({ item, index }: { item: Book; index: number }) => (
      <Animated.View
        entering={FadeInDown.springify()
          .damping(20)
          .duration(600)
          .delay(index * 100)}
        exiting={FadeOutRight.duration(300)}
      >
        <BookCard
          book={item}
          isInCart={cartItemIds.has(item.id)}
          onAddToCart={handleToggleAddToCart}
          variant="row"
          onPress={(book: Book) =>
            navigation.navigate('bookDetails', { book: book })
          }
        />
      </Animated.View>
    ),
    [navigation],
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title="My Cart" showBack onBack={() => navigation.goBack()} />
      {cartItems.length == 0 ? (
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
          keyExtractor={(item: Book) => item.id}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingHorizontal: 16,
  },
});
