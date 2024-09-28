import { CurrentUserType, MessageType } from "@/lib/types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  user: CurrentUserType;
  setUser: (user: CurrentUserType) => void;
  getUser: () => CurrentUserType;
  isLoading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  unseenMessages: MessageType[];
  addUnseenMessage: (message: MessageType) => void;
  removeMessages: (filterFn?: (message: MessageType) => boolean) => void;
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
        userName: "",
        friends: [],
        incomingFriendRequests: [],
        sentFriendRequests: [],
      },
      unseenMessages: [],
      isAuthenticated: false,
      isLoading: true,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      setUser: (user: CurrentUserType) =>
        set({ user, isAuthenticated: !!user._id, isLoading: false }),
      getUser: () => get().user,
      addUnseenMessage: (message: MessageType) =>
        set((state) => ({
          unseenMessages: [...state.unseenMessages, message],
        })),
      removeMessages: (filterFn?: (message: MessageType) => boolean) =>
        set((state) => ({
          unseenMessages: filterFn ? state.unseenMessages.filter(filterFn) : [],
        })),
    }),
    {
      name: "deck-auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
