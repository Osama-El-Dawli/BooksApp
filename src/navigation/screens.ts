import SplashScreen from '../features/splash/SplashScreen';
import HomeScreen from '../features/home/HomeScreen';
import { ScreenConfig } from './types';
import BookDetailsScreen from '../features/home/BookDetailsScreen';
import BookWebView from '../features/home/BookWebView';

export const screens: ScreenConfig[] = [
  { screenName: 'splash', component: SplashScreen },
  { screenName: 'home', component: HomeScreen },
  { screenName: 'bookDetails', component: BookDetailsScreen },
  { screenName: 'bookWebView', component: BookWebView },
];
