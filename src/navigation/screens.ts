import SplashScreen from '../features/splash/SplashScreen';
import HomeScreen from '../features/home/HomeScreen';
import { RootDrawerParamList, RootStackParamList, ScreenConfig } from './types';
import BookDetailsScreen from '../features/home/BookDetailsScreen';
import BookWebView from '../features/home/BookWebView';
import ProfileScreen from '../features/profile/ProfileScreen';
import FavoritesScreen from '../features/favorites/FavoritesScreen';
import CartScreen from '../features/cart/CartScreen';

export const stackScreens: ScreenConfig<RootStackParamList>[] = [
  { screenName: 'splash', component: SplashScreen },
  { screenName: 'bookDetails', component: BookDetailsScreen },
  { screenName: 'bookWebView', component: BookWebView },
];

export const DrawerScreens: ScreenConfig<RootDrawerParamList>[] = [
  {
    screenName: 'home',
    component: HomeScreen,
    title: 'Home',
    icon: 'home',
  },
  {
    screenName: 'profileScreen',
    component: ProfileScreen,
    title: 'Profile',
    icon: 'person',
  },
  {
    screenName: 'cartScreen',
    component: CartScreen,
    title: 'Cart',
    icon: 'shopping-cart',
  },
  {
    screenName: 'favoritesScreen',
    component: FavoritesScreen,
    title: 'Favorites',
    icon: 'favorite',
  },
];
