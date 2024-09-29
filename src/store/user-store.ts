import { iUser } from "@/interfaces";
import { create } from "zustand";

const usersGlobalStore = create((set) => ({
  currentUserData: null,
  setCurrentUserData: (data: iUser) => set({ currentUserData: data }),
}));

export default usersGlobalStore;

export interface IUsersGlobalStore {
  currentUserData: iUser | null;
  setCurrentUserData: (data: iUser) => void;
}
