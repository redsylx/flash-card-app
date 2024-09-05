import { create } from 'zustand';
import ICard, { defaultCard } from '../../../../interfaces/ICard';
import { defaultPaginationResultNoItems, IPaginationResultNoItems } from '../../../../interfaces/IPaginationResult';

type TableState<T> = {
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

const useTable = create<TableState<ICard>>((set) => ({
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

export default useTable;