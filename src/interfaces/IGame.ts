type GameStatus = "playing" | "finish";

interface IGame {
  id: string,
  createdTime: Date,
  lastUpdatedTime: Date,
  status: GameStatus,
  nCard: number,
  pctCorrect?: number,
  hideDurationInSecond: number
}

const defaultGame: IGame = {
  id: "",
  createdTime: new Date("2024-01-01"),
  lastUpdatedTime: new Date("2024-01-01"),
  status: "playing",
  nCard: 0,
  hideDurationInSecond: 0
}

interface ICreateGameDto {
  categoryIds: string[],
  accountId: string,
  nCard: number,
  hideDurationInSecond: number
}

export {
  defaultGame
}

export type {
  IGame,
  ICreateGameDto,
  GameStatus,
}