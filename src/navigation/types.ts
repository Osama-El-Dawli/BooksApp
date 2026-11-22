import { ComponentType } from 'react';
import { Book } from '../features/home/types/bookType';

export type RootStackParamList = {
  splash: undefined;
  home: undefined;
  bookDetails: {
    book: Book;
  };
  bookWebView: {
    previewLink: string;
    title: string;
  };
  profileScreen: undefined;
  favoritesScreen: undefined;
};

export type ScreenConfig = {
  screenName: keyof RootStackParamList;
  component: ComponentType<any>;
};
