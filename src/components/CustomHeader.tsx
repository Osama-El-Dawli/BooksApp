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
              <Icon name="person" size={32} color={'#000'} />
            )}
          </Pressable>
          <View style={{ flex: 1 }} />
        </>
      ) : null}
      {showBack ? (
        <Pressable onPress={onBack} hitSlop={8}>
          <Icon
            style={styles.backIcon}
            name="arrow-back-ios-new"
            size={24}
            color={'#000'}
          />
        </Pressable>
      ) : null}
      <Text style={styles.heading} numberOfLines={1}>
        {title}
      </Text>
      <View style={{ flex: 1 }} />
      {showCart ? (
        <Pressable onPress={onCartPress} hitSlop={8}>
          <Icon name="shopping-cart" size={32} color={'#000'} />
        </Pressable>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    marginRight: 12,
  },
  heading: {
    fontSize: 30,
    fontFamily: 'Cairo-Bold',
    color: '#000',
    marginTop: 4,
    paddingVertical: 6,
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00000062',
  },
});
