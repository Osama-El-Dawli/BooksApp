import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, ZoomIn } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomHeader from '../../components/CustomHeader';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import useImagePicker from './hooks/useImagePicker';
import ImageSourceSheet from './components/ImageSourceSheet';
import { useAppSelector } from '../../store/store';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const {
    showPicker,
    imageUri,
    closePicker,
    openCamera,
    openGallery,
    openSheet,
  } = useImagePicker();
  const { name, username, email } = useAppSelector(state => state.profile);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        title="Profile"
        showBack
        onBack={() => {
          navigation.goBack();
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
          <Pressable
            onPress={showPicker}
            accessibilityRole="button"
            accessibilityLabel="Change profile photo"
            style={styles.avatarWrapper}
          >
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.avatarImage} />
            ) : (
              <Icon name="person" size={100} color="#1A1A2E" />
            )}
            <View style={styles.cameraBadge}>
              <Icon name="photo-camera" size={18} color="#fff" />
            </View>
          </Pressable>
        </Animated.View>

        <Animated.Text
          entering={FadeInDown.delay(200).duration(500)}
          style={styles.name}
        >
          {name}
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(300).duration(500)}
          style={styles.username}
        >
          {username}
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.delay(400).duration(500)}
          style={styles.email}
        >
          {email}
        </Animated.Text>
      </ScrollView>
      <CustomButton
        text="Favorites"
        onPress={() => {
          navigation.navigate('favoritesScreen');
        }}
        style={{ margin: 16, marginBottom: 24 }}
      />

      <ImageSourceSheet
        visible={openSheet}
        onCamera={openCamera}
        onGallery={openGallery}
        onClose={closePicker}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F4EF' },
  content: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 40,
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#EDE8E0',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3D2B1F',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
    borderWidth: 3,
    borderColor: '#C8863A',
  },
  avatarImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#C8863A',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#F7F4EF',
  },
  name: {
    fontSize: 30,
    fontFamily: 'Cairo-Bold',
    color: '#1A1A2E',
    marginTop: 20,
  },
  username: {
    fontSize: 17,
    fontFamily: 'Cairo-Medium',
    color: '#C8863A',
    marginTop: 4,
  },
  email: {
    fontSize: 14,
    fontFamily: 'Cairo-Regular',
    color: '#8A7F72',
    marginTop: 4,
  },
});
