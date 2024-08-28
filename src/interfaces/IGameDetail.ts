import ICard, { defaultCard } from "./ICard";
import { defaultGame, IGame } from "./IGame";

interface IGameDetail {
  id: string,
  createdTime: Date,
  lastUpdatedTime: Date,
  isCorrect: boolean,
  isAnswered: boolean,
  indexNumber: number,
  game: IGame,
  card: ICard,
  categoryName: string,
}

const defaultGameDetail : IGameDetail = {
  id: "",
  createdTime: new Date("2024-01-01"),
  lastUpdatedTime: new Date("2024-01-01"),
  isCorrect: false,
  isAnswered: false,
  indexNumber: 0,
  game: defaultGame,
  card: defaultCard,
  categoryName: ""
}

export {
  defaultGameDetail
}

export type {
  IGameDetail
}