import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';

type Props = {
  text: string;
  onPress?: () => void;
};

export default function CustomButton({ text, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#000',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Cairo-SemiBold',
    color: '#fff',
    marginLeft: 8,
  },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
});
