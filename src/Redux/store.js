import {configureStore} from '@reduxjs/toolkit';
import todoSlice from './todoSlice.js';
import completedGoalSlice from './completedGoalSlice';
import {combineReducers} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['todos', 'completedTodos'],
};
const rootReducer = combineReducers({
  todos: todoSlice,
  completedTodos: completedGoalSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
