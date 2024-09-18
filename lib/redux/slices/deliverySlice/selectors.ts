import type { RootState } from '@/lib/redux'

export const selectdeliveries = (state: RootState) => state.delivery.deliveries
// export const selectdelivery = (state: RootState) => state.delivery.delivery
export const selectdeliveryState = (state: RootState) => state.delivery
export const selectdeliveryModal = (state: RootState) => state.delivery.deliveryModal

