import type { RootState } from '@/lib/redux'

export const selectPurchases = (state: RootState) => state.purchase.purchases
export const selectPurchaseStatus = (state: RootState) => state.purchase.status

