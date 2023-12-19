import { create } from 'zustand'
import {User} from "@supabase/supabase-js";

interface UserState {
  user: User
  serUser: (user: User | undefined) => void
}

export const useUser = create<UserState>()((set) => ({
  user: undefined,
  setUser: (user: User) => set(() => ({ user })),
}));
