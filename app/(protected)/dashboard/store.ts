import { create } from "zustand";

interface SelectedItemStore {
  selectedItem: any;
  setSelectedItem: (selectedItem: any) => void;
}

export const useSelectedItemStore = create<SelectedItemStore>((set) => ({
  selectedItem: null,
  setSelectedItem: (selectedItem) => set({ selectedItem }),
}));

interface AnswerStore {
  answer: any;
  setAnswer: (answer: any) => void;
}

export const useAnswerStore = create<AnswerStore>((set) => ({
  answer: null,
  setAnswer: (answer) => set({ answer }),
}));
