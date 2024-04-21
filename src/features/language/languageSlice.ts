import { createSlice } from '@reduxjs/toolkit';

interface LanguageState {
    currentLanguage: string;
}

const initialState: LanguageState = {
    currentLanguage: 'en',
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        changeLanguage: (state, action) => {
            state.currentLanguage = action.payload;
        },
    },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
