import { ComponentType } from "react";

export type RootStackParamList = {
  splash: undefined;
  home: undefined;
};

export type ScreenConfig = {
  screenName: keyof RootStackParamList;
  component: ComponentType<any>;
};