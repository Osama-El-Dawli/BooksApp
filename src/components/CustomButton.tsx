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
    paddingVertical: 15,
    borderRadius: 16,
    backgroundColor: '#C8863A',
    shadowColor: '#C8863A',
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Cairo-SemiBold',
    color: '#fff',
    marginLeft: 8,
    letterSpacing: 0.3,
  },
  pressed: { opacity: 0.88, transform: [{ scale: 0.97 }] },
});
