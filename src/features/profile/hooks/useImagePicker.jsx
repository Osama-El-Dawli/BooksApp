import { useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const options = { mediaType: 'photo', quality: 1 };

const requestCameraPermission = async () => {
  if (Platform.OS !== 'android') return true;
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
  );
  return result === PermissionsAndroid.RESULTS.GRANTED;
};

export default function useImagePicker(initialUrl = null) {
  const [imageUri, setImageUri] = useState(initialUrl);

  const handleResponse = response => {
    if (response.didCancel) return;
    if (response.errorCode) {
      Alert.alert('Error', response.errorMessage || 'Something went wrong');
      return;
    }
    const uri = response.assets?.[0]?.uri;
    if (uri) setImageUri(uri);
  };

  const openCamera = async () => {
    if (!(await requestCameraPermission())) {
      Alert.alert(
        'Permission denied',
        'Enable camera permission from settings',
      );
      return;
    }
    launchCamera(options, handleResponse);
  };

  const openGallery = () => launchImageLibrary(options, handleResponse);

  const showPicker = () =>
    Alert.alert('Profile photo', 'Choose a source', [
      { text: 'Camera', onPress: openCamera },
      { text: 'Gallery', onPress: openGallery },
      { text: 'Cancel', style: 'cancel' },
    ]);

  return { imageUri, showPicker };
}
