import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  onCartPress?: () => void;
  showProfile?: boolean;
  showCart?: boolean;
  imageUrl?: string | null;
  onProfilePress?: () => void;
};

export default function CustomHeader({
  title,
  showBack = false,
  onBack,
  showProfile = false,
  onProfilePress,
  onCartPress,
  showCart = false,
  imageUrl,
}: Props) {
  return (
    <View style={styles.header}>
      {showProfile ? (
        <>
          <Pressable onPress={onProfilePress} hitSlop={8}>
            {imageUrl ? (
              <Image source={{ uri: imageUrl }} style={styles.profileImage} />
            ) : (
              <View style={styles.profilePlaceholder}>
                <Icon name="person" size={26} color={'#C8863A'} />
              </View>
            )}
          </Pressable>
          <View style={{ flex: 1 }} />
        </>
      ) : null}
      {showBack ? (
        <Pressable onPress={onBack} hitSlop={10} style={styles.backBtn}>
          <Icon name="arrow-back-ios-new" size={20} color={'#1A1A2E'} />
        </Pressable>
      ) : null}
      <Text style={styles.heading} numberOfLines={1}>
        {title}
      </Text>
      <View style={{ flex: 1 }} />
      {showCart ? (
        <Pressable onPress={onCartPress} hitSlop={10} style={styles.cartBtn}>
          <Icon name="shopping-cart" size={22} color={'#1A1A2E'} />
        </Pressable>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 12,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EDE8E0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  cartBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EDE8E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 26,
    fontFamily: 'Cairo-Bold',
    color: '#1A1A2E',
    paddingVertical: 4,
  },
  profilePlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EDE8E0',
    borderWidth: 2,
    borderColor: '#C8863A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#C8863A',
  },
});
