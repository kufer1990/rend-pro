import { create } from "zustand";

type UserState = {
  token: string | null;
  firstName: string;
  lastName: string;
  avatarLink: string;
  setToken: (token: string | null) => void;
  setAvatarLink: (avatarLink: string) => void;
  setUserData: (data: { firstName: string; lastName: string }) => void;
  clearUserData: () => void;
};

export const useUserStore = create<UserState>(set => ({
  token: null,
  firstName: "",
  lastName: "",
  avatarLink: "",
  setToken: token => set({ token }),
  setUserData: ({ firstName, lastName }) => set({ firstName, lastName }),
  setAvatarLink: avatarLink => set({ avatarLink }),
  clearUserData: () =>
    set({ token: null, firstName: "", lastName: "", avatarLink: "" }),
}));
