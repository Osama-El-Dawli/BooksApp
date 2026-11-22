import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Book } from '../types/bookType';

type Props = {
  book: Book
  onPress: (book: Book) => void;
  variant?: string;
};

function BookCard({
  book,
  onPress,
  variant = 'row',
}: Props) {
  const compact = variant === 'compact';
  const handlePress = useCallback(() => onPress(book), [book, onPress]);

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        compact ? styles.compactCard : styles.rowCard,
        pressed && styles.pressed,
      ]}
    >
      <Image
        source={{ uri: book.cover }}
        style={compact ? styles.compactCover : styles.rowCover}
      />
      <View style={compact ? styles.compactInfo : styles.rowInfo}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        {book.subtitle ? (
          <Text style={styles.subtitle} numberOfLines={1}>
            {book.subtitle}
          </Text>
        ) : null}
        <Text style={styles.author} numberOfLines={1}>
          Authors: {book.author}
        </Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" color="gold" size={12} />
          <Text style={styles.rating}>{book.rating.toFixed(1)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default React.memo(BookCard);

const shadow = {
  shadowColor: '#000',
  shadowOpacity: 0.08,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 3 },
  elevation: 3,
};

const styles = StyleSheet.create({
  rowCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    ...shadow,
  },
  rowCover: {
    width: 80,
    height: 115,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  rowInfo: { flex: 1, marginLeft: 14, justifyContent: 'center' },

  compactCard: {
    width: 140,
    height:300,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginRight: 12,
    ...shadow,
  },
  compactCover: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  compactInfo: { marginTop: 10, flex: 1 },

  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  title: { fontSize: 16, fontFamily: 'Cairo-SemiBold', color: '#111' },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    color: '#9ca3af',
    marginTop: 2,
  },
  author: {
    fontSize: 13,
    fontFamily: 'Cairo-Regular',
    color: '#6b7280',
    marginTop: 4,
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  rating: {
    fontSize: 14,
    fontFamily: 'Cairo-Medium',
    color: '#374151',
    marginLeft: 8,
  },
});
