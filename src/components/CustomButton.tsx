import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import React from 'react';

type Props = {
  text: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function CustomButton({ text, onPress, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [style, styles.btn, pressed && styles.pressed]}
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
