import { CurrentUserType } from "@/lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  user: CurrentUserType;
  setUser: (user: CurrentUserType) => void;
  getUser: () => CurrentUserType;
  isLoading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: {
        _id: "",
        firstName: "",
        lastName: "",
        email: "",
        avatar: "",
        bio: "",
        friends: [],
        incomingFriendRequests: [],
        sentFriendRequests: [],
      },
      isAuthenticated: false,
      isLoading: true,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      setUser: (user: CurrentUserType) =>
        set({ user, isAuthenticated: !!user._id, isLoading: false }),
      getUser: () => get().user,
    }),
    {
      name: "deck-auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
