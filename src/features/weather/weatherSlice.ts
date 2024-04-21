import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchWeatherData } from './weatherAPI';

interface WeatherState {
    data: any; // Adjust the type according to your response data structure
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: WeatherState = {
    data: null,
    loading: 'idle',
    error: null,
};

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async ({ city, language }: { city: string; language: string }) => {
        try {
            const data = await fetchWeatherData(city, language);
            return data;
        } catch (error) {
            throw Error('Failed to fetch weather data');
        }
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                state.data = action.payload;
                state.error = null;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message ?? 'Failed to fetch weather data';
            });
    },
});

export default weatherSlice.reducer;
