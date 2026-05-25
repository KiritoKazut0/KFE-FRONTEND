import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/src/features/auth/interfaces/models/user.model';


interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  register: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      
      login: (userData) => set({ 
        user: userData, 
        isAuthenticated: true 
      }),

      register: (userData) => set({
        user: userData,
        isAuthenticated: true 
      }),
      
      logout: () => set({ 
        user: null, 
        isAuthenticated: false 
      }),


    }),
    {
      name: 'auth-storage', 
    }
  )
);