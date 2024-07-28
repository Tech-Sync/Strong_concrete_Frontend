/* Instruments */
import type { RootState } from '@/lib/redux'

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectThemeConfig = (state: RootState) => state.theme
export const selectIsDarkMode = (state: RootState) => state.theme.isDarkMode
export const selectRtlClass = (state: RootState) => state.theme.rtlClass
