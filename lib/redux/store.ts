/* Core */
import { configureStore, type ThunkAction, type Action } from '@reduxjs/toolkit'
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from 'react-redux'

/* Instruments */
import { reducer } from './rootReducer'
// import { middleware } from './middleware'

export const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) => {
  //   return getDefaultMiddleware().concat(middleware)
  // },
})
export const useDispatch = () => useReduxDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

/* Types */
export type ReduxStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>
