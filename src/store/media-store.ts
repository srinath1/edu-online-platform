import { IMedia, iUser } from "@/interfaces";
import { create } from "zustand";

const mediaGlobalStore = create((set) => ({
  media: [],
  setMedia: (data: any) => set({ media: data }),
}));

export default mediaGlobalStore;

export interface ImediaGlobalStore {
  media: IMedia[];
  setMedia: (data: any) => void;
}
