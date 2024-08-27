import { create } from 'zustand';
import ICardCategory, { defaultCardCategory } from '../../../../interfaces/ICardCategory';
import ICard, { defaultCard } from '../../../../interfaces/ICard';

type PopupCardState = "add" | "update";

type PopupState = {
  isCardCategoryOpen: boolean;
  isCardOpen: boolean;
  selectedCardCategory: ICardCategory;
  selectedCard: ICard;
  modifiedCard: ICard;
  stateCard: PopupCardState;

  setIsCardOpen: (isOpen: boolean) => void;
  setIsCardCategoryOpen: (isOpen: boolean) => void;
  setSelectedCardCategory: (cardCategory: ICardCategory) => void;
  setSelectedCard: (card: ICard) => void;
  setModifiedCard: (card: ICard) => void;
  setStateCard: (state: "add" | "update") => void;
}

const usePopup = create<PopupState>((set) => ({
  isCardCategoryOpen: false,
  isCardOpen: false,
  selectedCardCategory: defaultCardCategory,
  selectedCard: defaultCard,
  modifiedCard: defaultCard,
  stateCard: 'add',

  setIsCardCategoryOpen: (bool) => set(() => ({ isCardCategoryOpen: bool })),
  setIsCardOpen: (bool) => set(() => ({ isCardOpen: bool })),
  setSelectedCardCategory: (cardCategory) => set(() => ({ selectedCardCategory: cardCategory })),
  setSelectedCard: (card) => set(() => ({ selectedCard: card, modifiedCard: card })),
  setModifiedCard: (card) => set(() => ({ modifiedCard: card })),
  setStateCard: (state) => set(() => ({ stateCard: state })),
}));

export default usePopup;
export type {
  PopupCardState
}
