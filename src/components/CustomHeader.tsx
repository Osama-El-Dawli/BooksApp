import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  showProfile?: boolean;
  onProfilePress?: () => void;
};

export default function CustomHeader({
  title,
  showBack = false,
  onBack,
  showProfile = false,
  onProfilePress,
}: Props) {
  return (
    <View style={styles.header}>
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
      {showProfile ? (
        <>
          <View style={{ flex: 1 }} />
          <Pressable onPress={onProfilePress} hitSlop={8}>
            <Icon name="person" size={32} color={'#000'} />
          </Pressable>
        </>
      ) : null}
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
    paddingRight: 16,
    marginRight: 12,
  },
});
