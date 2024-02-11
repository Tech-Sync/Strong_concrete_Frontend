import type { RootState } from '@/lib/redux'

export const selectFirms = (state: RootState) => state.firm.firms
export const selectStatus = (state: RootState) => state.firm.status

