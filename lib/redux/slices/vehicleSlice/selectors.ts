import type { RootState } from '@/lib/redux'

export const selectVehicles = (state: RootState) => state.vehicle.vehicles
export const selectVehicleStatus = (state: RootState) => state.vehicle.status

