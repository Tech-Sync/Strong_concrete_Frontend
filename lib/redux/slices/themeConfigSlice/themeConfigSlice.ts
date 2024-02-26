import themeConfig from '@/theme.config';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState:ThemeConfigSliceState = {
  isDarkMode: false,
  sidebar: false,
  theme: themeConfig.theme, // light | dark | system
  menu: themeConfig.menu,// vertical, collapsible-vertical, horizontal
  layout: themeConfig.layout,// full, boxed-layout
  rtlClass: themeConfig.rtlClass, // rtl, ltr
  animation: themeConfig.animation,// animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
  navbar: themeConfig.navbar,// navbar-sticky, navbar-floating, navbar-static
  semidark: themeConfig.semidark,
 
}; 

export const themeConfigSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
      toggleTheme(state, { payload }) {
        payload = payload || state.theme;
        localStorage.setItem('theme', payload);
        state.theme = payload;
        if (payload === 'light') { // light | dark | system
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
    toggleMenu(state, { payload }) {
      payload = payload || state.menu; // vertical, collapsible-vertical, horizontal
      state.sidebar = false; // reset sidebar state
      localStorage.setItem('menu', payload);
      state.menu = payload;
  },
  toggleLayout(state, { payload }) {
      payload = payload || state.layout; // full, boxed-layout
      localStorage.setItem('layout', payload);
      state.layout = payload;
  },
  toggleRTL(state, { payload }) {
      payload = payload || state.rtlClass; // rtl, ltr
      localStorage.setItem('rtlClass', payload);
      state.rtlClass = payload;
      document.querySelector('html')?.setAttribute('dir', state.rtlClass || 'ltr');
  },
  toggleAnimation(state, { payload }) {
      payload = payload || state.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
      payload = payload?.trim();
      localStorage.setItem('animation', payload);
      state.animation = payload;
  },
  toggleNavbar(state, { payload }) {
      payload = payload || state.navbar; // navbar-sticky, navbar-floating, navbar-static
      localStorage.setItem('navbar', payload);
      state.navbar = payload;
  },
  toggleSemidark(state, { payload }) {
      payload = payload === true || payload === 'true' ? true : false;
      localStorage.setItem('semidark', payload);
      state.semidark = payload;
  },

  toggleSidebar(state) {
      state.sidebar = !state.sidebar;
  },

  setPageTitle(state, { payload }) {
      document.title = `${payload} | VRISTO - Multipurpose Tailwind Dashboard Template`;
  },
  },

})
export const { toggleTheme, toggleMenu, toggleLayout, toggleRTL, toggleAnimation, toggleNavbar, toggleSemidark, toggleSidebar, setPageTitle } = themeConfigSlice.actions;

/* Types */
export interface ThemeConfigSliceState {
  isDarkMode: boolean
  sidebar: boolean
  theme: string
  menu: string
  layout: string
  rtlClass: string
  animation: string
  navbar: string
  semidark: boolean

}
