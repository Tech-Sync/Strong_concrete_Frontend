/* Instruments */
import { counterSlice } from './slices'
import { themeSlice } from './slices/themeSlice'

export const reducer = {
  counter: counterSlice.reducer,
  theme:themeSlice.reducer
}
