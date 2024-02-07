'use client'
import { selectThemeConfig, themeConfigSlice } from '@/lib/redux/slices/themeConfigSlice';
import { PropsWithChildren, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
// import { IRootState } from './store';
// import { toggleRTL, toggleTheme, toggleLocale, toggleMenu, toggleLayout, toggleAnimation, toggleNavbar, toggleSemidark } from './store/themeConfigSlice';
import { MantineProvider } from '@mantine/core';

function AppContainer({ children }: PropsWithChildren) {

    const themeConfig = useSelector(selectThemeConfig)
    // const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();
    // const { i18n } = useTranslation();

    useEffect(() => {
        dispatch(themeConfigSlice.actions.toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
        dispatch(themeConfigSlice.actions.toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
        dispatch(themeConfigSlice.actions.toggleLayout(localStorage.getItem('layout') || themeConfig.layout));
        dispatch(themeConfigSlice.actions.toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass));
        dispatch(themeConfigSlice.actions.toggleAnimation(localStorage.getItem('animation') || themeConfig.animation));
        dispatch(themeConfigSlice.actions.toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar));
        dispatch(themeConfigSlice.actions.toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark));
        // locale



    }, [dispatch, themeConfig.theme, themeConfig.menu, themeConfig.layout, themeConfig.rtlClass, themeConfig.animation, themeConfig.navbar, themeConfig.semidark]);

    return (
        <div
            className={`${(themeConfig.sidebar && 'toggle-sidebar') || ''} ${themeConfig.menu} ${themeConfig.layout} ${themeConfig.rtlClass
                } main-section relative font-nunito text-sm font-normal antialiased`}
        >
            <MantineProvider>

                {children}
            </MantineProvider>
        </div>
    );
}

export default AppContainer;
