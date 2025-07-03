// store/userStore.ts
import { create } from 'zustand'

type User = {
  id: string
  email: string
  role: string
}

type State = {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

export const useUserStore = create<State>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}))
