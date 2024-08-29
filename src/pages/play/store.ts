import { create } from "zustand";
import { defaultGame, IGame } from "../../interfaces/IGame";
import { defaultGameDetail, IGameDetail } from "../../interfaces/IGameDetail";

type PlayStatus = "start" | "pause" | "play" | "finish";

type PlayState = {
  game: IGame;
  gameDetails: IGameDetail[];
  selectedGameDetail: IGameDetail;
  status: PlayStatus;

  setGame: (data: IGame) => void;
  setGameDetails : (data: IGameDetail[]) => void;
  setSelectedGameDetail : (data: IGameDetail) => void;
  setStatus : (data: PlayStatus) => void;
}

const usePlay = create<PlayState>((set) => ({
  game: defaultGame,
  gameDetails: [],
  selectedGameDetail: defaultGameDetail,
  status: "start",

  setGame: (data: IGame) => set({ game: data }),
  setGameDetails: (data: IGameDetail[]) => set({ gameDetails: data }),
  setSelectedGameDetail: (data: IGameDetail) => set({ selectedGameDetail: data }),
  setStatus: (data: PlayStatus) => set({ status: data }),
}));

export default usePlay;