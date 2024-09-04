import ICardCategory, { defaultCardCategory } from "./ICardCategory";

export default interface ICard {
    clueTxt: string;
    clueImg: string;
    clueImgUrl: string;
    nFrequency: number;
    nCorrect: number;
    pctCorrect?: number;
    id: string;
    descriptionTxt: string;
    categoryName: string;
    cardCategory: ICardCategory;
    createdTime: Date
  }

const defaultCard : ICard = {
  clueImg: "",
  clueImgUrl: "",
  clueTxt: "",
  descriptionTxt: "",
  id: "0",
  nCorrect: 0,
  nFrequency: 0,
  categoryName: "",
  cardCategory: defaultCardCategory,
  createdTime: new Date(),
}

const emptyCard : ICard = {
  clueImg: "",
  clueImgUrl: "",
  clueTxt: "Nothing Here",
  descriptionTxt: "this category has no card yet :( please press button 'add' to add a new card",
  id: "dummy",
  nCorrect: 0,
  nFrequency: 0,
  categoryName: "",
  cardCategory: defaultCardCategory,
  createdTime: new Date(),
}

export {
  defaultCard,
  emptyCard
}