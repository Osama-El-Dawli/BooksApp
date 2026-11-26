import { createMMKV } from 'react-native-mmkv';

const mmkv = createMMKV();

export const mmkvStorage = {
  getItem: (key: string) => mmkv.getString(key),
  setItem: (key: string, value: string) => mmkv.set(key, value),
  removeItem: (key: string) => mmkv.remove(key),
};
