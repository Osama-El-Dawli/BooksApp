import React from 'react';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Option = ({ icon, label, onPress }) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={label}
    style={({ pressed }) => [styles.option, pressed && styles.pressed]}
  >
    <View style={styles.iconCircle}>
      <Icon name={icon} size={24} color="#fff" />
    </View>
    <Text style={styles.optionText}>{label}</Text>
  </Pressable>
);

export default function ImageSourceSheet({
  visible,
  onClose,
  onCamera,
  onGallery,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

        <Animated.View
          entering={SlideInDown.duration(300)}
          style={styles.sheet}
        >
          <View style={styles.indicator} />
          <Text style={styles.title}>Profile photo</Text>
          <Option icon="photo-camera" label="Camera" onPress={onCamera} />
          <Option icon="photo-library" label="Gallery" onPress={onGallery} />
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
  },
  indicator: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d0d0d0',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Cairo-SemiBold',
    color: '#111',
    marginBottom: 12,
    textAlign: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  pressed: { backgroundColor: '#f0f0f0' },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#353535',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionText: {
    fontSize: 18,
    fontFamily: 'Cairo-Medium',
    color: '#111',
  },
});
