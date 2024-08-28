import { create } from 'zustand';
import ICardCategory, { defaultCardCategory } from '../../../../interfaces/ICardCategory';

type DropdownState = {
  prevSelectedCardCategory: ICardCategory;
  selectedCardCategory: ICardCategory;
  selectedCardCategories: ICardCategory[];
  cardCategories: ICardCategory[];
  searchTerm: string;
  cardCategoriesToShow: ICardCategory[];
  isOpen: boolean;
  refresh: boolean;

  setPrevSelectedCardCategory: (cardCategory: ICardCategory) => void;
  setSelectedCardCategory: (cardCategory: ICardCategory) => void;
  setSelectedCardCategories: (cardCategories: ICardCategory[]) => void;
  setCardCategories: (cardCategories: ICardCategory[]) => void;
  setSearchTerm: (searchTerm: string) => void;
  setCardCategoriesToShow: (cardCategories: ICardCategory[]) => void;
  setIsOpen: (isOpen: boolean) => void;
  setRefresh: (refresh: boolean) => void;
}

const createDropdownStore = () => create<DropdownState>((set) => ({
  prevSelectedCardCategory: defaultCardCategory,
  selectedCardCategory: defaultCardCategory,
  selectedCardCategories: [],
  cardCategories: [],
  searchTerm: "",
  cardCategoriesToShow: [],
  isOpen: false,
  refresh: false,
  setPrevSelectedCardCategory: (cardCategory) => set(() => ({ prevSelectedCardCategory: cardCategory })),
  setSelectedCardCategory: (cardCategory) => set(() => ({ selectedCardCategory: cardCategory })),
  setSelectedCardCategories: (cardCategories) => set(() => ({ selectedCardCategories: cardCategories })),
  setCardCategories: (cardCategories) => set(() => ({ cardCategories: cardCategories })),
  setSearchTerm: (term) => set(() => ({ searchTerm: term })),
  setCardCategoriesToShow: (cardCategories) => set(() => ({ cardCategoriesToShow: cardCategories })),
  setIsOpen: (bool) => set(() => ({ isOpen: bool })),
  setRefresh: (bool) => set(() => ({ refresh: bool })),
}));

// Use the factory function to create two separate stores
const useHomeDropdown = createDropdownStore();
const useGameDropdown = createDropdownStore();

export { useHomeDropdown, useGameDropdown };
export type { DropdownState };