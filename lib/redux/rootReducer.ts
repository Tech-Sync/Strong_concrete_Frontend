/* Instruments */
import { counterSlice } from './slices'
import { themeConfigSlice } from './slices/themeConfigSlice'

export const reducer = {
  counter: counterSlice.reducer,
  theme:themeConfigSlice.reducer
}
