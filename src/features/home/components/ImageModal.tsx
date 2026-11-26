import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ImageZoom } from '@likashefqet/react-native-image-zoom';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  visible: boolean;
  imageUri: string;
  onRequestClose: () => void;
};

export default function ImageModal({
  visible,
  onRequestClose,
  imageUri,
}: Props) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onRequestClose}
    >
      <GestureHandlerRootView style={styles.modalRoot}>
        <ImageZoom
          uri={imageUri}
          isDoubleTapEnabled
          minScale={1}
          maxScale={4}
          resizeMode="contain"
          style={{ width, height }}
        />
        <Pressable
          onPress={onRequestClose}
          hitSlop={12}
          style={[styles.closeBtn, { top: insets.top + 12 }]}
        >
          <Icon name="close" size={26} color="#fff" />
        </Pressable>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalRoot: { flex: 1, backgroundColor: 'rgba(0,0,0,0.95)' },
  closeBtn: {
    position: 'absolute',
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
