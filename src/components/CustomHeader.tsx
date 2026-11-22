import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = { title: string; showBack?: boolean; onBack?: () => void };

export default function CustomHeader({
  title,
  showBack = false,
  onBack,
}: Props) {
  return (
    <View style={styles.header}>
      {showBack ? (
        <Icon
          onPress={onBack}
          style={styles.backIcon}
          name="arrow-back-ios-new"
          size={24}
          color={'#000'}
        />
      ) : null}
      <Text style={styles.heading} numberOfLines={1}>
        {title}
      </Text>
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
