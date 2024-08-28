import { create } from "zustand";
import { defaultGame, IGame } from "../../interfaces/IGame";
import { defaultGameDetail, IGameDetail } from "../../interfaces/IGameDetail";

type PlayState = {
  game: IGame;
  gameDetails: IGameDetail[];
  selectedGameDetail: IGameDetail;

  setGame: (data: IGame) => void;
  setGameDetails : (data: IGameDetail[]) => void;
  setSelectedGameDetail : (data: IGameDetail) => void;
}

const usePlay = create<PlayState>((set) => ({
  game: defaultGame,
  gameDetails: [],
  selectedGameDetail: defaultGameDetail,

  setGame: (data: IGame) => set({ game: data }),
  setGameDetails: (data: IGameDetail[]) => set({ gameDetails: data }),
  setSelectedGameDetail: (data: IGameDetail) => set({ selectedGameDetail: data }),
}));

export default usePlay;