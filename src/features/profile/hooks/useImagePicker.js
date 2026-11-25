import { useState } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { startMapper } from 'react-native-reanimated';
import { updateImageProfile } from '../redux/profileSlice';

const options = { mediaType: 'photo', quality: 1 };

const requestCameraPermission = async () => {
  if (Platform.OS !== 'android') return true;
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.CAMERA,
  );
  return result === PermissionsAndroid.RESULTS.GRANTED;
};

export default function useImagePicker() {
  const dispatch = useAppDispatch();
  const imageUri = useAppSelector(state => state.profile.imageUrl);
  const [openSheet, setOpenSheet] = useState(false);

  const handleResponse = response => {
    if (response.didCancel) return;
    if (response.errorCode) {
      Alert.alert('Error', response.errorMessage || 'Something went wrong');
      return;
    }
    const uri = response.assets?.[0]?.uri;
    if (uri) dispatch(updateImageProfile(uri));
  };

  const showPicker = () => setOpenSheet(true);
  const closePicker = () => setOpenSheet(false);

  const openCamera = async () => {
    closePicker();
    if (!(await requestCameraPermission())) {
      Alert.alert(
        'Permission denied',
        'Enable camera permission from settings',
      );
      return;
    }
    launchCamera(options, handleResponse);
  };

  const openGallery = () => {
    closePicker();
    launchImageLibrary(options, handleResponse);
  };

  return {
    imageUri,
    showPicker,
    closePicker,
    openSheet,
    openCamera,
    openGallery,
  };
}
