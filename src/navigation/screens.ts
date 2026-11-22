import SplashScreen from '../features/splash/SplashScreen';
import HomeScreen from '../features/home/HomeScreen';
import { ScreenConfig } from './types';



export const screens: ScreenConfig[] = [
  { screenName: 'splash', component: SplashScreen },
  { screenName: 'home', component: HomeScreen },
];
