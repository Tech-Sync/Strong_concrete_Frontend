import { selectTheme, themeSlice } from '@/lib/redux/slices/themeSlice'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ThemeSwitcher = () => {
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  return (
    <div>
    <div>Theme {theme}</div>
    <button

      type="button"
      className="text-red-500 bg-slate-100 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 dark:focus:ring-red-700 rounded-lg text-sm p-2.5"
      onClick={() => dispatch(themeSlice.actions.toggleTheme('dark'))}
    >
      Dark Mode
    </button>
    <button

      type="button"
      className="text-red-500 bg-slate-100 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 dark:focus:ring-red-700 rounded-lg text-sm p-2.5"
      onClick={() => dispatch(themeSlice.actions.toggleTheme('light'))}
    >
      Light Mode
    </button>
  </div>
  )
}

export default ThemeSwitcher