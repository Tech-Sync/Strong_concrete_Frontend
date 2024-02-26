import type { RootState } from '@/lib/redux'

export const selectAccounts = (state: RootState) => state.accounts.acccounts
export const selectAccountstStatus = (state: RootState) => state.accounts.status

