import { create } from 'zustand';
import ICard, { defaultCard } from '../../../../interfaces/ICard';
import { defaultPaginationResultNoItems, IPaginationResultNoItems } from '../../../../interfaces/IPaginationResult';

type TableState<T> = {
  items: T[];
  selectedItem: T;
  paginationResult: IPaginationResultNoItems;
  setItems: (data: T[]) => void;
  setSelectedItem: (data: T) => void;
  setPaginationResult: (data: IPaginationResultNoItems) => void;
}

const useTable = create<TableState<ICard>>((set) => ({
  items: [],
  selectedItem: defaultCard,
  paginationResult: defaultPaginationResultNoItems,
  setItems: (data: ICard[]) => set({ items: data}),
  setSelectedItem: (data: ICard) => set({selectedItem: data}),
  setPaginationResult: (data: IPaginationResultNoItems) => set({ paginationResult: data}),
}));

export default useTable;