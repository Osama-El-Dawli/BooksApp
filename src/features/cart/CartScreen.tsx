import { View, Text, FlatList } from 'react-native';
import React, { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useNavigation } from '@react-navigation/native';
import useCart from './hooks/useCart';
import Animated, { FadeInDown } from 'react-native-reanimated';
import BookCard from '../home/components/BookCard';
import { Book } from '../home/types/bookType';

type nav = NativeStackNavigationProp<RootStackParamList>;

export default function CartScreen() {
  const navigation = useNavigation<nav>();
  const { cartItems } = useCart();

  const cartBooks = useCallback(
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
          onPress={(book: Book) =>
            navigation.navigate('bookDetails', { book: book })
          }
        />
      </Animated.View>
    ),
    [navigation],
  );

  return (
    <SafeAreaView>
      <CustomHeader title="My Cart" showBack onBack={() => navigation.pop()} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={cartItems}
        renderItem={cartBooks}
        keyExtractor={(item: Book) => item.id}
      />
    </SafeAreaView>
  );
}
