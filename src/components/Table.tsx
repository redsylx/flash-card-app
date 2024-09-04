import { create } from 'zustand';
import { defaultGame, IGame } from '../interfaces/IGame';

type TableState<T> = {
  items: T[];
  selectedItem: T;
  setItems: (data: T[]) => void;
  setSelectedItem: (data: T) => void;
}

const useTable = create<TableState<IGame>>((set) => ({
  items: [],
  selectedItem: defaultGame,
  setItems: (data: IGame[]) => set({items: data}),
  setSelectedItem: (data: IGame) => set({selectedItem: data})
}));

export default useTable;