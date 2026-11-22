import { useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  FadeInDown,
  FadeOutRight,
  LinearTransition,
  ZoomIn,
} from 'react-native-reanimated';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import BookCard from '../home/components/BookCard';
import useFavorite from './hook/useFavorite';

export default function FavoritesScreen() {
  const { favorites, navigation, handleBookPress, handleToggle } =
    useFavorite();

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Favorites"
        showBack
        onBack={() => navigation.goBack()}
      />

      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Animated.View
            entering={ZoomIn.duration(500).springify().damping(50)}
            style={styles.emptyIconWrapper}
          >
            <Icon name="favorite-border" size={56} color="#000" />
          </Animated.View>

          <Animated.Text
            entering={FadeInDown.delay(200).duration(500)}
            style={styles.emptyTitle}
          >
            No favorites yet
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.delay(300).duration(500)}
            style={styles.emptyText}
          >
            Tap the heart on any book to save it here.
          </Animated.Text>

          <Animated.View
            entering={FadeInDown.delay(400).duration(500)}
            style={styles.emptyButtonWrapper}
          >
            <CustomButton
              text="Browse Books"
              onPress={() => navigation.popTo('home')}
            />
          </Animated.View>
        </View>
      ) : (
        <Animated.FlatList
          contentContainerStyle={styles.list}
          data={favorites}
          keyExtractor={item => item.id}
          itemLayoutAnimation={LinearTransition.duration(300)}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInDown.delay(index * 100).duration(400)}
              exiting={FadeOutRight.duration(300)}
            >
              <BookCard
                book={item}
                isFavorite
                onToggleFavorite={handleToggle}
                onPress={handleBookPress}
              />
            </Animated.View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eee' },
  list: { marginTop: 12, paddingHorizontal: 16, paddingBottom: 24 },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingBottom: 80,
  },
  emptyIconWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: 'Cairo-SemiBold',
    color: '#111',
    marginTop: 24,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 22,
  },
  emptyButtonWrapper: {
    alignSelf: 'stretch',
    marginTop: 24,
  },
});
