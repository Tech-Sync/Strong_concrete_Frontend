import type { RootState } from '@/lib/redux'

export const selectProductions = (state: RootState) => state.production.productions
export const selectProduction = (state: RootState) => state.production.production
export const selectProductionStatus = (state: RootState) => state.production.status
export const selectProductionModal = (state: RootState) => state.production.productionModal

