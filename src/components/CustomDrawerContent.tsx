import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppSelector } from '../store/store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { mmkvStorage } from '../storage/mmkvStorage';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  const insets = useSafeAreaInsets();
  const { name, email } = useAppSelector(state => state.profile);
  const imageUrl = useAppSelector(state => state.profile.imageUrl);
  const navigation = useNavigation<Nav>();

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { paddingTop: insets.top + 24 }]}>
          <Pressable
            onPress={() => {
              props.navigation.navigate('profileScreen');
            }}
          >
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatar}>
                <Icon name="person" size={44} color="#C8863A" />
              </View>
            )}
          </Pressable>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.email} numberOfLines={1}>
            {email}
          </Text>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 8 }]}>
        <DrawerItem
          label="Logout"
          labelStyle={styles.logoutLabel}
          style={styles.logoutItem}
          icon={({ size }) => (
            <Icon name="logout" size={size} color="#dc2626" />
          )}
          onPress={() => {
            mmkvStorage.removeItem('token');
            navigation.popTo('login');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F4EF' },
  header: {
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: '#1A1A2E',
    paddingHorizontal: 20,
    paddingBottom: 28,
    marginBottom: 12,
    marginHorizontal: 12,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(200,134,58,0.25)',
    borderWidth: 2,
    borderColor: '#C8863A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Cairo-SemiBold',
    color: '#fff',
  },
  email: {
    fontSize: 13,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#EDE8E0',
    paddingTop: 8,
  },
  logoutItem: { borderRadius: 14, marginHorizontal: 14 },
  logoutLabel: {
    fontFamily: 'Cairo-Medium',
    fontSize: 16,
    color: '#dc2626',
  },
});
