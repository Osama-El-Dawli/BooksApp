import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppSelector } from '../store/store';

export default function CustomDrawerContent(
  props: DrawerContentComponentProps,
) {
  const insets = useSafeAreaInsets();
  const { name, email } = useAppSelector(state => state.profile);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.header, { paddingTop: insets.top + 24 }]}>
          <View style={styles.avatar}>
            <Icon name="person" size={44} color="#fff" />
          </View>
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
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    marginTop: 16,
    borderRadius: 16,
    backgroundColor: '#353535',
    paddingHorizontal: 20,
    paddingBottom: 24,
    marginBottom: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Cairo-SemiBold',
    color: '#fff',
  },
  email: {
    fontSize: 13,
    fontFamily: 'Cairo-Regular',
    color: 'rgba(255,255,255,0.7)',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 8,
  },
  logoutItem: { borderRadius: 14, marginHorizontal: 14 },
  logoutLabel: {
    fontFamily: 'Cairo-Medium',
    fontSize: 16,
    color: '#dc2626',
  },
});
