import { defaultGame, IGame } from "./IGame";

interface IGameDetail {
  id: string,
  createdTime: Date,
  lastUpdatedTime: Date,
  isCorrect: boolean,
  isAnswered: boolean,
  indexNumber: number,
  game: IGame,
  clueTxt: string,
  clueImg: string,
  clueImgUrl: string,
  descriptionTxt: string,
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
  clueTxt: "",
  clueImg: "",
  clueImgUrl: "",
  descriptionTxt: "",
  categoryName: ""
}

export {
  defaultGameDetail
}

export type {
  IGameDetail
}