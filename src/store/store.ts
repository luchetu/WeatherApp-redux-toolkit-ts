// store.ts
import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';
import languagerReducer from '../features/language/languageSlice';


const store = configureStore({
    reducer: {
        weather: weatherReducer,
        language: languagerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
