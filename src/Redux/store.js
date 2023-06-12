import {configureStore} from '@reduxjs/toolkit';
import todoSlice from './todoSlice.js';
import completedGoalSlice from './completedGoalSlice.js';
import {combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';
import {FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['todos'],
  whitelist: ['completedTodos'],
};
const rootReducer = combineReducers({
  todos: todoSlice,
  completedTodos: completedGoalSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
