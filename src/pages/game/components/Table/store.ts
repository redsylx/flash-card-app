import { create } from 'zustand';
import { defaultGame, IGame } from '../../../../interfaces/IGame';

type TableState = {
  games: IGame[];
  selectedGame: IGame;
  setGames: (data: IGame[]) => void;
  setSelectedGame: (data: IGame) => void;
}

const useTable = create<TableState>((set) => ({
  games: [],
  selectedGame: defaultGame,
  setGames: (data: IGame[]) => set({games: data}),
  setSelectedGame: (data: IGame) => set({selectedGame: data})
}));

export default useTable;