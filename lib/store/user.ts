import { create } from 'zustand'
import { IUser } from '../types';

interface UserState {
  user: IUser
  setUser: (user: IUser | null) => void
}

export const useUser = create<UserState>()(set => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
