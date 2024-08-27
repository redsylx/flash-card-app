import { create } from 'zustand';
import ICardCategory, { defaultCardCategory } from '../../../../interfaces/ICardCategory';

type DropdownState = {
  prevSelectedCardCategory: ICardCategory;
  selectedCardCategory: ICardCategory;
  cardCategories: ICardCategory[];
  searchTerm: string;
  cardCategoriesToShow: ICardCategory[];
  isOpen: boolean;
  refresh: boolean;

  setPrevSelectedCardCategory: (cardCategory: ICardCategory) => void;
  setSelectedCardCategory: (cardCategory: ICardCategory) => void;
  setCardCategories: (cardCategories: ICardCategory[]) => void;
  setSearchTerm: (searchTerm: string) => void;
  setCardCategoriesToShow: (cardCategories: ICardCategory[]) => void;
  setIsOpen: (isOpen: boolean) => void;
  setRefresh: (refresh: boolean) => void;
}

const useDropdown = create<DropdownState>((set) => ({
  prevSelectedCardCategory: defaultCardCategory,
  selectedCardCategory: defaultCardCategory,
  cardCategories: [],
  searchTerm: "",
  cardCategoriesToShow: [],
  isOpen: false,
  refresh: false,
  setPrevSelectedCardCategory: (cardCategory) => set(() => ({ prevSelectedCardCategory: cardCategory })),
  setSelectedCardCategory: (cardCategory) => set(() => ({ selectedCardCategory: cardCategory })),
  setCardCategories: (cardCategories) => set(() => ({ cardCategories: cardCategories })),
  setSearchTerm: (term) => set(() => ({searchTerm: term})),
  setCardCategoriesToShow: (cardCategories) => set(() => ({ cardCategoriesToShow: cardCategories })),
  setIsOpen: (bool) => set(() => ({isOpen: bool})),
  setRefresh: (bool) => set(() => ({refresh: bool})),
}));

export default useDropdown;