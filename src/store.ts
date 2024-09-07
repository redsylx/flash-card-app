import { create } from 'zustand';
import IAccount, { defaultAccount } from './interfaces/IAccount';
import ICardCategory, { defaultCardCategory } from './interfaces/ICardCategory';

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

export { 
  useAccount, 
  useCardCategory,
  useImageUploaderHome, 
  useImageUploaderStore, 
  useCardCategoryDropdownStateStore
};

export type {
  IImageUploaderState,
  IDropdownState
}