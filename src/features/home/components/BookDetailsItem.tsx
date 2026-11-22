import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Book } from '../types/bookType';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  book: Book;
  isFavorite?: boolean;
  onToggleFavorite?: (book: Book) => void;
};

export default function BookDetailsItem({
  book,
  isFavorite = false,
  onToggleFavorite: onToggleFavourite,
}: Props) {
  return (
    <View style={styles.container}>
      <Animated.View
        entering={ZoomIn.duration(500).springify().damping(50)}
        style={styles.imageWrapper}
      >
        <Animated.Image
          resizeMode="cover"
          source={{ uri: book.cover }}
          style={styles.image}
        />

        <Pressable
          onPress={() => onToggleFavourite?.(book)}
          hitSlop={8}
          style={({ pressed }) => [styles.favButton, pressed && styles.pressed]}
        >
          <Icon
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={22}
            color={isFavorite ? '#000' : '#6b7280'}
          />
        </Pressable>
      </Animated.View>

      <Animated.Text
        entering={FadeInDown.delay(200).duration(500)}
        style={styles.title}
      >
        {book.title}
      </Animated.Text>

      {book.subtitle ? (
        <Animated.Text
          entering={FadeInDown.delay(300).duration(500)}
          style={styles.subtitle}
        >
          {book.subtitle}
        </Animated.Text>
      ) : null}

      <Animated.Text
        entering={FadeInDown.delay(400).duration(500)}
        style={styles.author}
      >
        by {book.author}
      </Animated.Text>

      <Animated.View
        entering={FadeInDown.delay(500).duration(500)}
        style={styles.ratingRow}
      >
        <Icon name="star" color="gold" size={18} />
        <Text style={styles.rating}>{book.rating.toFixed(1)}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  imageWrapper: {
    width: 200,
    aspectRatio: 2 / 3,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  favButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 10,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.92 }] },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Cairo-SemiBold',
    color: '#111',
    textAlign: 'center',
    marginTop: 24,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 4,
  },
  author: {
    fontSize: 15,
    fontFamily: 'Cairo-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  rating: {
    fontSize: 16,
    fontFamily: 'Cairo-Medium',
    color: '#374151',
    marginLeft: 6,
  },
});
