import type { RootState } from '@/lib/redux'

export const selectSales = (state: RootState) => state.sale.sales
export const selectWeeklySales = (state: RootState) => state.sale.weeklySales
export const selectSaleStatus = (state: RootState) => state.sale.status
export const selectSale = (state: RootState) => state.sale.sale

