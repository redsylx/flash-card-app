import { create } from 'zustand';
import ICard, { defaultCard } from '../../../../interfaces/ICard';

type CardState = {
  selectedCard: ICard;
  cards: ICard[];
  openedCard: ICard;
  prevOpenedCard: ICard;
  refresh: boolean;
  setSelectedCard: (card: ICard) => void;
  setCards: (cards: ICard[]) => void;
  setOpenedCard: (card: ICard) => void;
  setRefresh: (refresh: boolean) => void;
}

const useCard = create<CardState>((set) => ({
  selectedCard: defaultCard,
  cards: [],
  openedCard: defaultCard,
  prevOpenedCard: defaultCard,
  refresh: false,

  setSelectedCard: (card: ICard) => set({ selectedCard: card }),
  setCards: (cards: ICard[]) => set({ cards: cards }),
  setOpenedCard: (card: ICard) => set((state) => ({
    prevOpenedCard: state.openedCard,
    openedCard: card
  })),
  setRefresh: (refresh: boolean) => set({ refresh: refresh }),
}));

export default useCard;
