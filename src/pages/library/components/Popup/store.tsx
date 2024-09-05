import { create } from 'zustand';
import ICard, { defaultCard } from '../../../../interfaces/ICard';

type PopupState = {
  isOpen: boolean;
  selectedCard: ICard;
  setIsOpen: (isOpen: boolean) => void;
  setSelectedCard: (card: ICard) => void;
}

const createUsePopup = () => create<PopupState>((set) => ({
  isOpen: false,
  selectedCard: defaultCard,
  setIsOpen: (bool) => set(() => ({ isOpen: bool })),
  setSelectedCard: (card) => set(() => ({ selectedCard: card, modifiedCard: card })),
}));

const usePopup = createUsePopup();

export { 
  usePopup
}

export type {
  PopupState,
}
