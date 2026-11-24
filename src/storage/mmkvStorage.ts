import { createMMKV } from 'react-native-mmkv';
import { Storage } from 'redux-persist';

const mmkv = createMMKV();

export const mmkvStorage: Storage = {
  getItem: key => {
    return Promise.resolve(mmkv.getString(key));
  },
  setItem: (key, value) => {
    mmkv.set(key, value);
    return Promise.resolve(true);
  },
  removeItem: key => {
    mmkv.remove(key);
    return Promise.resolve();
  },
};
