import { selectThemeConfig, themeConfigSlice } from '@/lib/redux/slices/themeConfigSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ThemeSwitcher = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectThemeConfig)
  console.log(theme);
  
  return (
    <div>
      <div>Theme {theme.theme}</div>
      <button

        type="button"
        className="text-red-500 bg-slate-100 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 dark:focus:ring-red-700 rounded-lg text-sm p-2.5"
        onClick={() => dispatch(themeConfigSlice.actions.toggleTheme('dark'))}
      >
        Dark Mode
      </button>
      <button

        type="button"
        className="text-red-500 bg-slate-100 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 dark:focus:ring-red-700 rounded-lg text-sm p-2.5"
        onClick={() => dispatch(themeConfigSlice.actions.toggleTheme('light'))}
      >
        Light Mode
      </button>
    </div>
  )
}

export default ThemeSwitcher