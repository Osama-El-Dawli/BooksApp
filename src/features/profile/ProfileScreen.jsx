import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Profile"
        showBack
        onBack={() => {
          navigation.pop();
        }}
      />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={ZoomIn.duration(500).springify().damping(100)}
          style={styles.avatarWrapper}
        >
          <Icon name="person" size={100} color="#353535" />
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.delay(200).duration(500)}
          style={styles.name}
        >
          Osama Saeid
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(300).duration(500)}
          style={styles.username}
        >
          @osos_eldawli
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(400).duration(500)}
          style={styles.email}
        >
          osama@gmail.com
        </Animated.Text>
      </ScrollView>
      <CustomButton
        text="Favorites"
        onPress={() => {
          navigation.navigate('favoritesScreen');
        }}
        style={{ margin: 16, marginBottom: 24 }}
      />
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
  avatarWrapper: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: '#d8d8d8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  name: {
    fontSize: 32,
    fontFamily: 'Cairo-SemiBold',
    color: '#111',
    marginTop: 16,
  },
  username: {
    fontSize: 18,
    fontFamily: 'Cairo-Medium',
    color: '#000',
    marginTop: 2,
  },
  email: {
    fontSize: 16,
    fontFamily: 'Cairo-Regular',
    color: '#6b7280',
    marginTop: 2,
  },
});
