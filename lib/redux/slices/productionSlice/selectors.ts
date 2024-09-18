import type { RootState } from '@/lib/redux'

export const selectproductions = (state: RootState) => state.production.productions
export const selectproduction = (state: RootState) => state.production.production
export const selectproductionStatus = (state: RootState) => state.production.status
export const selectproductionModal = (state: RootState) => state.production.productionModal

