import { ComponentType } from 'react';
import { Book } from '../features/home/types/bookType';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  splash: undefined;
  login: undefined;
  Main: NavigatorScreenParams<RootDrawerParamList> | undefined;
  bookDetails: {
    book: Book;
  };
  bookWebView: {
    previewLink: string;
    title: string;
  };
};

export type RootDrawerParamList = {
  home: undefined;
  profileScreen: undefined;
  favoritesScreen: undefined;
  cartScreen: undefined;
};

export type ScreenConfig<T> = {
  screenName: keyof T;
  component: ComponentType<any>;
  title?: string;
  icon?: string;
};
