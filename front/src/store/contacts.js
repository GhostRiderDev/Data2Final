import { create } from "zustand";

export const useStore = create((set) => ({
  contacts: [],
  setContacts: (contactsToSet) => set({ contacts: contactsToSet }),
}));
