import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';
import productsReducer from './features/productsSlice';
import cartReducer from './features/cartSlice';
import { useDispatch } from 'react-redux';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer
    // add other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
