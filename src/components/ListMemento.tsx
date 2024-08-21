import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface Card {
  clueTxt: string;
  clueImg: string;
  nFrequency: number;
  nCorrect: number;
  pctCorrect: number | null;
  id: string;
  descriptionTxt: string;
}

interface CardProps {
  card: Card,
  selected?: false,
}

const Card: React.FC<CardProps> = ({ card }) => {
  const [ flip, setFlip] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  if(!card || card.id === "0" ) {
    return (
      <div className="cursor-pointer relative bg-bg border-2 border-sub p-4 rounded-xl text-text flex flex-col justify-between aspect-[16/9] md:aspect-[3/2] lg:aspect-[4/3] xl:aspect-[1/1] 2xl:aspect-[3/4] custom-card"
        onClick={() => setFlip(!flip)}>
        <div className="flex justify-between">
          <div className="w-max">
            {flip ? <div className="break-words text-text text-[4vw] md:text-[2.25vw] lg:text-[1.75vw] xl:text-[1.25vw]">
            {card.descriptionTxt}
          </div>
          :
          <div>
            <div className="break-words font-bold text-text text-lg sm:text-xl md:text-2xl lg:text-3xl">
              {card.clueTxt}
            </div>
          </div>
          }
          </div>
          <div>
          <MoreVertIcon
            onClick={toggleMenu}
            className="text-text cursor-pointer mt-1 hover:text-main"
          />
          {showMenu && (
            <div className="absolute right-3 mt-2 w-24 bg-bg text-text rounded-lg border-2 border-sub">
              <div className="px-4 py-2 cursor-pointer hover:bg-sub-alt rounded-t-lg">
                Edit
              </div>
              <div className="px-4 py-2 cursor-pointer hover:bg-sub-alt rounded-b-lg">
                Delete
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    )
  }
  return (
    <div className="relative bg-bg border-2 border-sub p-4 rounded-xl text-text flex flex-col justify-between aspect-[16/9] md:aspect-[3/2] lg:aspect-[4/3] xl:aspect-[1/1] 2xl:aspect-[3/4] custom-card"
    onClick={() => setFlip(!flip)}>
      {flip ? <div className="break-words text-text text-[4vw] md:text-[2.25vw] lg:text-[1.75vw] xl:text-[1.25vw]">
        {card.descriptionTxt}
      </div>
      :
      <div>
        <div className="break-words font-bold text-text text-lg sm:text-xl md:text-2xl lg:text-3xl">
          {card.clueTxt}
        </div>
        <div className="flex justify-between items-end mt-auto">
          <div className="text-gray-400 text-sm">{card.nFrequency}x</div>
          {card.pctCorrect !== null && (
            <div className="text-pink-300 text-sm">{card.pctCorrect}%</div>
          )}
        </div>
      </div>
      }
    </div>
  );
};

interface ListMementoProps {
  listMemento: Card[]
}

const ListMemento: React.FC<ListMementoProps> = ({ listMemento }) => {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
      if(!listMemento || (listMemento && listMemento.length < 1)) {
        const defaultCard : Card = {
          clueImg: "",
          clueTxt: "No Cards Found :(",
          descriptionTxt: "Oops, nothing here",
          id: "0",
          nCorrect: 0,
          nFrequency: 0,
          pctCorrect: null
        }
        setCards([defaultCard])
      } else {
        setCards(listMemento);
      }
    }, [listMemento])
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
          />
        ))}
      </div>
    );
  };

  export {
    ListMemento
  }

  export type {
    Card,
  }