import { create } from 'zustand';

type SearchBarState = {
  category: string;
  keyword: string;
  categories: string[];
  isOpen: boolean;
  setCategory: (data: string) => void;
  setKeyword: (data: string) => void;
  setCategories: (data: string[]) => void;
  setIsOpen: (data: boolean) => void;
}

const createUseSearchBar = () => create<SearchBarState>((set) => ({
  category: "",
  keyword: "",
  categories: [],
  isOpen: false,
  setCategory: (data: string) => set(() => ({ category: data })),
  setKeyword: (data: string) => set(() => ({ keyword: data })),
  setCategories: (data: string[]) => set(() => ({ categories: data })),
  setIsOpen: (data: boolean) => set(() => ({ isOpen: data })),
}));

const useSearchBar = createUseSearchBar();

export { 
  useSearchBar
}

export type {
  SearchBarState
}
