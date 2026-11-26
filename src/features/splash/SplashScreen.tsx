import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';
import lottieFile from '../../assets/lotties/splash.json';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { mmkvStorage } from '../../storage/mmkvStorage';

type nav = NativeStackNavigationProp<RootStackParamList>;

export default function SplashScreen() {
  const navigation = useNavigation<nav>();
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lottie}
        source={lottieFile}
        loop={false}
        autoPlay
        onAnimationFinish={() => {
          const token = mmkvStorage.getItem('token');
          token ? navigation.replace('Main') : navigation.replace('login');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottie: {
    width: '80%',
    height: '80%',
  },
});
