import type { RootState } from '@/lib/redux'

export const selectUsers = (state: RootState) => state.user.users
export const selectUserStatus = (state: RootState) => state.user.status

