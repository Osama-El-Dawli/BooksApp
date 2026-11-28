import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Book } from '../types/bookType';

type Props = {
  book: Book;
  onPress: (book: Book) => void;
  onToggleFavorite?: (book: Book) => void;
  onAddToCart?: (book: Book) => void;
  onIncrement?: (id: string) => void;
  onDecrement?: (id: string) => void;
  isFavorite?: boolean;
  isInCart?: boolean;
  quantity?: number;
  variant?: string;
  showFav?: boolean;
};

function BookCard({
  book,
  onPress,
  variant = 'row',
  onToggleFavorite,
  onAddToCart,
  onIncrement,
  onDecrement,
  showFav = true,
  isFavorite = false,
  isInCart = false,
  quantity = 0,
}: Props) {
  const compact = variant === 'compact';
  const handlePress = useCallback(() => onPress(book), [book, onPress]);
  const handleFavorite = useCallback(
    () => onToggleFavorite?.(book),
    [book, onToggleFavorite],
  );
  const handleAddToCart = useCallback(
    () => onAddToCart?.(book),
    [book, onAddToCart],
  );
  const handleIncrement = useCallback(
    () => onIncrement?.(book.id),
    [book.id, onIncrement],
  );
  const handleDecrement = useCallback(
    () => onDecrement?.(book.id),
    [book.id, onDecrement],
  );

  const renderStepper = (fullWidth = false) => {
    if (!isInCart || !onIncrement || !onDecrement) return null;
    return (
      <View style={[styles.stepper, fullWidth && styles.stepperFull]}>
        <Pressable
          onPress={handleDecrement}
          hitSlop={6}
          style={({ pressed }) => [styles.stepBtn, pressed && styles.pressed]}
        >
          <Ionicons
            name={quantity <= 1 ? 'trash-outline' : 'remove'}
            size={14}
            color={quantity <= 1 ? '#DC2626' : '#1A1A2E'}
          />
        </Pressable>
        <Text style={styles.stepQty}>{quantity}</Text>
        <Pressable
          onPress={handleIncrement}
          hitSlop={6}
          style={({ pressed }) => [
            styles.stepBtn,
            styles.stepBtnAdd,
            pressed && styles.pressed,
          ]}
        >
          <Ionicons name="add" size={14} color="#FFFFFF" />
        </Pressable>
      </View>
    );
  };

  if (compact) {
    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [styles.compactCard, pressed && styles.pressed]}
      >
        <View style={styles.compactCoverWrapper}>
          <Image source={{ uri: book.cover }} style={styles.compactCover} />

          <Pressable
            onPress={handleFavorite}
            hitSlop={8}
            style={({ pressed }) => [
              styles.coverBadge,
              styles.badgeTR,
              isFavorite && styles.coverBadgeFavActive,
              pressed && styles.pressed,
            ]}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={15}
              color={isFavorite ? '#C8863A' : '#8A7F72'}
            />
          </Pressable>

          <View style={[styles.ratingOverlay, styles.badgeBL]}>
            <Ionicons name="star" color="#C8863A" size={11} />
            <Text style={styles.ratingOverlayText}>
              {book.rating.toFixed(1)}
            </Text>
          </View>
        </View>

        <View style={styles.compactInfo}>
          <View>
            <Text style={styles.compactTitle} numberOfLines={2}>
              {book.title}
            </Text>
            <Text style={styles.compactAuthor} numberOfLines={1}>
              {book.author}
            </Text>
          </View>

          {onAddToCart ? (
            <View style={styles.compactFooter}>
              {isInCart && onIncrement && onDecrement ? (
                renderStepper(true)
              ) : (
                <Pressable
                  onPress={handleAddToCart}
                  hitSlop={6}
                  style={({ pressed }) => [
                    styles.addBtnFull,
                    isInCart && styles.addBtnActive,
                    pressed && styles.pressed,
                  ]}
                >
                  <Ionicons
                    name={isInCart ? 'cart' : 'cart-outline'}
                    size={15}
                    color={isInCart ? '#FFFFFF' : '#1A1A2E'}
                  />
                  <Text
                    style={[
                      styles.addBtnText,
                      isInCart && styles.addBtnTextActive,
                    ]}
                  >
                    {isInCart ? 'In Cart' : 'Add'}
                  </Text>
                </Pressable>
              )}
            </View>
          ) : null}
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.rowCard, pressed && styles.pressed]}
    >
      <View style={styles.rowCoverWrapper}>
        <Image source={{ uri: book.cover }} style={styles.rowCover} />
      </View>

      <View style={styles.rowBody}>
        <View style={styles.rowTop}>
          <View style={styles.rowTitleBlock}>
            <Text style={styles.rowTitle} numberOfLines={2}>
              {book.title}
            </Text>
            {book.subtitle ? (
              <Text style={styles.rowSubtitle} numberOfLines={1}>
                {book.subtitle}
              </Text>
            ) : null}
            <Text style={styles.rowAuthor} numberOfLines={1}>
              {book.author}
            </Text>
          </View>

          {showFav ? (
            <Pressable
              onPress={handleFavorite}
              hitSlop={8}
              style={({ pressed }) => [
                styles.favBtn,
                isFavorite && styles.favBtnActive,
                pressed && styles.pressed,
              ]}
            >
              <Ionicons
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={17}
                color={isFavorite ? '#C8863A' : '#A89F94'}
              />
            </Pressable>
          ) : null}
        </View>

        <View style={styles.rowFooter}>
          <View style={styles.ratingPill}>
            <Ionicons name="star" color="#C8863A" size={12} />
            <Text style={styles.ratingText}>{book.rating.toFixed(1)}</Text>
          </View>

          {onAddToCart ? (
            isInCart && onIncrement && onDecrement ? (
              renderStepper(false)
            ) : (
              <Pressable
                onPress={handleAddToCart}
                hitSlop={8}
                style={({ pressed }) => [
                  styles.addBtnPill,
                  isInCart && styles.addBtnActive,
                  pressed && styles.pressed,
                ]}
              >
                <Ionicons
                  name={isInCart ? 'cart' : 'cart-outline'}
                  size={15}
                  color={isInCart ? '#FFFFFF' : '#1A1A2E'}
                />
                <Text
                  style={[
                    styles.addBtnText,
                    isInCart && styles.addBtnTextActive,
                  ]}
                >
                  {isInCart ? 'Added' : 'Add'}
                </Text>
              </Pressable>
            )
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}

export default React.memo(BookCard);

const shadow = {
  shadowColor: '#3D2B1F',
  shadowOpacity: 0.08,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 4,
};

const styles = StyleSheet.create({
  // ── ROW ──
  rowCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EDE8E0',
    alignItems: 'stretch',
    ...shadow,
  },
  rowCoverWrapper: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#E8E0D5',
    shadowColor: '#3D2B1F',
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  rowCover: {
    width: 86,
    height: 124,
    borderRadius: 14,
    backgroundColor: '#E8E0D5',
  },
  rowBody: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  rowTitleBlock: {
    flex: 1,
    paddingRight: 8,
  },
  rowTitle: {
    fontSize: 15,
    fontFamily: 'Cairo-Bold',
    color: '#1A1A2E',
    lineHeight: 21,
  },
  rowSubtitle: {
    fontSize: 12,
    fontFamily: 'Cairo-Regular',
    color: '#A89F94',
    marginTop: 2,
  },
  rowAuthor: {
    fontSize: 12,
    fontFamily: 'Cairo-Medium',
    color: '#8A7F72',
    marginTop: 4,
  },
  favBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#F7F4EF',
    borderWidth: 1,
    borderColor: '#EDE8E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favBtnActive: {
    backgroundColor: '#FFF5EB',
    borderColor: '#F0D5B8',
  },
  rowFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  // ── COMPACT ──
  compactCard: {
    width: 154,
    height: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#EDE8E0',
    overflow: 'hidden',
    ...shadow,
  },
  compactCoverWrapper: {
    width: '100%',
    height: 162,
    backgroundColor: '#E8E0D5',
  },
  compactCover: {
    width: '100%',
    height: '100%',
  },
  coverBadge: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderWidth: 1,
    borderColor: '#EDE8E0',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  coverBadgeFavActive: {
    backgroundColor: '#FFF5EB',
    borderColor: '#F0D5B8',
  },
  badgeTR: { top: 8, right: 8 },
  badgeBL: { bottom: 8, left: 8 },
  ratingOverlay: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EDE8E0',
    gap: 3,
    zIndex: 10,
  },
  ratingOverlayText: {
    fontSize: 11,
    fontFamily: 'Cairo-Bold',
    color: '#1A1A2E',
  },
  compactInfo: {
    flex: 1,
    padding: 10,
    paddingTop: 8,
    paddingBottom: 0,
  },
  compactTitle: {
    fontSize: 13,
    fontFamily: 'Cairo-Bold',
    color: '#1A1A2E',
    lineHeight: 18,
  },
  compactAuthor: {
    fontSize: 11,
    fontFamily: 'Cairo-Regular',
    color: '#8A7F72',
    marginTop: 2,
  },
  compactFooter: {
    marginTop: 'auto',
    marginBottom: 8,
  },

  // ── SHARED PILLS & BUTTONS ──
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5EB',
    borderWidth: 1,
    borderColor: '#F3DFC7',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Cairo-Bold',
    color: '#C8863A',
  },
  addBtnPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#F7F4EF',
    borderWidth: 1,
    borderColor: '#EDE8E0',
    gap: 5,
  },
  addBtnFull: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 32,
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#F7F4EF',
    borderWidth: 1,
    borderColor: '#EDE8E0',
    gap: 5,
  },
  addBtnActive: {
    backgroundColor: '#C8863A',
    borderColor: '#C8863A',
  },
  addBtnText: {
    fontSize: 12,
    fontFamily: 'Cairo-SemiBold',
    color: '#1A1A2E',
  },
  addBtnTextActive: {
    color: '#FFFFFF',
  },

  // ── STEPPER ──
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32,
    backgroundColor: '#F7F4EF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EDE8E0',
    paddingHorizontal: 2,
    alignSelf: 'flex-start',
  },
  stepperFull: {
    width: '100%',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  stepBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnAdd: {
    backgroundColor: '#C8863A',
  },
  stepQty: {
    fontSize: 13,
    fontFamily: 'Cairo-Bold',
    color: '#1A1A2E',
    paddingHorizontal: 8,
    minWidth: 26,
    textAlign: 'center',
  },

  pressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
});
