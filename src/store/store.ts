import { combineReducers, configureStore } from '@reduxjs/toolkit';
import bookReducer from '../features/home/redux/bookSlice';
import { useDispatch, useSelector } from 'react-redux';
import { mmkvStorage } from '../storage/mmkvStorage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

const booksPersistConfig = {
  key: 'books',
  storage: mmkvStorage,
  whitelist: ['favorites', 'allBooks', 'featuredBooks'],
};

const rootReducer = combineReducers({
  books: persistReducer(booksPersistConfig, bookReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefault =>
    getDefault({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
