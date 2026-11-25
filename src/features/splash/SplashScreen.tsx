import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';
import lottieFile from '../../assets/lotties/splash.json';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
          navigation.replace('Main');
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
