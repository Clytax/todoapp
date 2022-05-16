import create from 'zustand';
import { persist } from 'zustand/middleware';

const useThemeStore = create(
  persist((set, get) => ({
    theme: 'light',

    changeTheme: () =>
      set((prevState) => ({
        theme: prevState.theme === 'light' ? 'dark' : 'light',
      })),
  })),
);

export default useThemeStore;
