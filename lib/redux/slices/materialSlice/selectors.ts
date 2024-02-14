import type { RootState } from '@/lib/redux'

export const selectMaterials = (state: RootState) => state.material.materials
export const selectMaterialStatus = (state: RootState) => state.material.status

