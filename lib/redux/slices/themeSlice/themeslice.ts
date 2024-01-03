import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: ThemeSliceState = {
  isDarkMode: false,
  theme: 'light', // light, dark, system
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
      toggleTheme(state, { payload }) {
        payload = payload || state.theme;
        localStorage.setItem('theme', payload);
        state.theme = payload;
        if (payload === 'light') {
            state.isDarkMode = false;
        } else if (payload === 'dark') {
            state.isDarkMode = true;
        } else if (payload === 'system') {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                state.isDarkMode = true;
            } else {
                state.isDarkMode = false;
            }
        }

        if (state.isDarkMode) {
            document.querySelector('body')?.classList.add('dark');
        } else {
            document.querySelector('body')?.classList.remove('dark');
        }
    },
  
  },

})

/* Types */
export interface ThemeSliceState {
  isDarkMode: boolean
  theme: string
}
