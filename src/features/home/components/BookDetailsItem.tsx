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
  onToggleFavorite: onToggleFavorite,
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
          onPress={() => onToggleFavorite?.(book)}
          hitSlop={8}
          style={({ pressed }) => [styles.favButton, pressed && styles.pressed]}
        >
          <Icon
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={22}
            color={isFavorite ? '#C8863A' : '#A89F94'}
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
        <Icon name="star" color="#C8863A" size={18} />
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
    borderRadius: 18,
    backgroundColor: '#E8E0D5',
    shadowColor: '#3D2B1F',
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  favButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(247,244,239,0.94)',
    borderWidth: 1,
    borderColor: '#EDE8E0',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 10,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.92 }] },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Cairo-Bold',
    color: '#1A1A2E',
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 8,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#A89F94',
    textAlign: 'center',
    marginTop: 4,
  },
  author: {
    fontSize: 14,
    fontFamily: 'Cairo-Medium',
    color: '#8A7F72',
    textAlign: 'center',
    marginTop: 6,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    backgroundColor: '#FFF5EB',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EDE8E0',
  },
  rating: {
    fontSize: 15,
    fontFamily: 'Cairo-SemiBold',
    color: '#C8863A',
    marginLeft: 6,
  },
});
