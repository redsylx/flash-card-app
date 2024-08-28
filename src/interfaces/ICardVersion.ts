import ICard, { defaultCard } from "./ICard";

interface ICardVersion {
  clueTxt: string,
  clueImg: string,
  clueImgUrl: string,
  id: string,
  descriptionTxt: string,
  card: ICard
}

const defaultCardVersion : ICardVersion = {
  clueTxt: "",
  clueImg: "",
  clueImgUrl: "",
  id: "",
  descriptionTxt: "",
  card: defaultCard
}

export {
  defaultCardVersion
}

export type {
  ICardVersion
}