import type { RootState } from '@/lib/redux'

export const selectFirms = (state: RootState) => state.firm.firms
export const selectFirmStatus = (state: RootState) => state.firm.status

