import type { RootState } from '@/lib/redux'

export const selectFirms = (state: RootState) => state.firm.firms
export const selectFirm = (state: RootState) => state.firm.firm
export const selectFirmStatus = (state: RootState) => state.firm.status
export const selectFirmModal = (state: RootState) => state.firm.firmModal

