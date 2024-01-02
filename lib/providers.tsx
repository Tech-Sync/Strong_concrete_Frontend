'use client'

/* Core */
import { Provider } from 'react-redux'

/* Instruments */
import { store } from '@/lib/redux'

export const ReduxProvider = (props: React.PropsWithChildren) => {
  return <Provider store={store}>{props.children}</Provider>
}
