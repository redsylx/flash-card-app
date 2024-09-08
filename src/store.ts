import { create } from 'zustand';
import IAccount, { defaultAccount } from './interfaces/IAccount';
import ICardCategory, { defaultCardCategory } from './interfaces/ICardCategory';
import { defaultPaginationResultNoItems, IPaginationResultNoItems } from './interfaces/IPaginationResult';
import ICard, { defaultCard } from './interfaces/ICard';
import { defaultSellCardCategory, ISellCardCategory } from './interfaces/ISellCardCategory';

type AccountState = {
  account: IAccount;
  setAccount: (newAccount: IAccount) => void;
}

const useAccount = create<AccountState>((set) => ({
  account: defaultAccount,
  setAccount: (newAccount) => set(() => ({ account: newAccount })),
}));

interface ICardCategoryState {
  items: ICardCategory[],
  setItems: (data: ICardCategory[]) => void
}

const useCardCategory = create<ICardCategoryState>((set) => ({
  items: [],
  setItems: (items) => set({items})
}))

interface IImageUploaderState {
  image: File | null;
  previewUrl: string;
  setImage: (image: File | null) => void;
  setPreviewUrl: (url: string) => void;
}

const createImageUploader = () => create<IImageUploaderState>((set) => ({
  image: null,
  previewUrl: '',
  
  setImage: (image: File | null) => set({ image }),
  setPreviewUrl: (url: string) => set({ previewUrl: url }),
}));

const useImageUploaderHome = createImageUploader();
const useImageUploaderStore = createImageUploader();

interface IDropdownState<T> {
  item: T,
  setItem: (data: T) => void,
  items: T[],
  setItems: (data: T[]) => void,
  isOpen: boolean,
  setIsOpen: (data: boolean) => void,
}

const createCardCategoryDropdownState = () => create<IDropdownState<ICardCategory>>((set) => ({
  item: defaultCardCategory,
  items: [],
  isOpen: false,
  setItem: (item) => set({ item }),
  setItems: (items) => set({ items }),
  setIsOpen: (isOpen) => set({ isOpen })
}));

const useCardCategoryDropdownStateStore = createCardCategoryDropdownState();

interface ITableState<T> {
  items: T[];
  selectedItem: T;
  paginationResult: IPaginationResultNoItems;
  order: string;
  isDescending: boolean;
  refresh: boolean;
  setItems: (data: T[]) => void;
  setSelectedItem: (data: T) => void;
  setPaginationResult: (data: IPaginationResultNoItems) => void;
  setOrder: (data: string) => void;
  setIsDescending: (data: boolean) => void;
  setRefresh: (data: boolean) => void;
}

const createCardTableState = () => create<ITableState<ICard>>((set) => ({
  items: [],
  selectedItem: defaultCard,
  paginationResult: defaultPaginationResultNoItems,
  order: "",
  isDescending: false,
  refresh: false,
  setItems: (data: ICard[]) => set({ items: data}),
  setSelectedItem: (data: ICard) => set({selectedItem: data}),
  setPaginationResult: (data: IPaginationResultNoItems) => set({ paginationResult: data}),
  setOrder: (data: string) => set({ order: data }),
  setIsDescending: (data: boolean) => set({ isDescending: data }),
  setRefresh: (data: boolean) => set({ refresh: data})
}));

const createSellCardCategoryTableState = () => create<ITableState<ISellCardCategory>>((set) => ({
  items: [],
  selectedItem: defaultSellCardCategory,
  paginationResult: defaultPaginationResultNoItems,
  order: "",
  isDescending: false,
  refresh: false,
  setItems: (items) => set({ items }),
  setSelectedItem: (selectedItem) => set({selectedItem}),
  setPaginationResult: (paginationResult) => set({ paginationResult }),
  setOrder: (order) => set({ order }),
  setIsDescending: (isDescending) => set({ isDescending }),
  setRefresh: (refresh) => set({ refresh })
}));

const useCardTableStateLibrary = createCardTableState();
const useSellCardCategoryTableStateStore = createSellCardCategoryTableState();

export { 
  useAccount, 
  useCardCategory,
  useImageUploaderHome, 
  useImageUploaderStore, 
  useCardCategoryDropdownStateStore,
  useCardTableStateLibrary,
  useSellCardCategoryTableStateStore
};

export type {
  IImageUploaderState,
  IDropdownState
}