import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../../components/CustomHeader';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomButton from '../../components/CustomButton';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import BookDetailsItem from './components/BookDetailsItem';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function BookDetailsScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'bookDetails'>>();
  const { book } = route.params;
  const navigate = useNavigation<Nav>();

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Book Details"
        showBack
        onBack={() => navigate.pop()}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <BookDetailsItem book={book} />
      </ScrollView>
      <Animated.View
        entering={FadeInDown.delay(600).duration(500)}
        style={styles.buttonWrapper}
      >
        <CustomButton
          style={{ margin: 16, marginBottom: 24 }}
          text="Preview"
          onPress={() =>
            navigate.navigate('bookWebView', {
              previewLink: book.previewLink,
              title: book.title,
            })
          }
        />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  buttonWrapper: { alignSelf: 'stretch', marginTop: 24 },
});
