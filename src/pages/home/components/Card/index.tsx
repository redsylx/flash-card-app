import { useEffect, useState } from "react";
import ICard, { emptyCard } from "../../../../interfaces/ICard";
import usePopup from "../Popup/store";
import useCard from "./store";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface ICardProps {
  card: ICard,
}

const Card: React.FC<ICardProps> = ({ card }) => {
  const cardState = useCard();
  const popupState = usePopup();

  const [ open, setOpen ] = useState(false);

  useEffect(() => {
    setOpen(cardState.openedCard.id === card.id)
  }, [cardState.openedCard])

  const onClick = () => {
    if(card.id == cardState.openedCard.id) {
      setOpen(!open);
    } else {
      cardState.setOpenedCard(card)
    };
  }

  const actionEdit = (e) => {
    e.stopPropagation();
    popupState.setSelectedCard(card);
    popupState.setStateCard("update");
    popupState.setIsCardOpen(true);
  }

  return (
    <div 
    className="relative rounded-xl aspect-[16/9] md:aspect-[3/2] lg:aspect-[4/3] xl:aspect-[1/1] 2xl:aspect-[3/4] overflow-clip"
    onClick={onClick}
    >
      { card.clueImgUrl && (<div>
        <div
        className={`absolute inset-0 ${card.clueImgUrl ? 'bg-cover bg-center' : 'bg-bg'}`}
        style={{
          backgroundImage: card.clueImgUrl ? `url(${card.clueImgUrl})` : undefined,
        }}
      ></div> {open ? <div className="absolute inset-0 bg-bg opacity-25"></div> : <div className="absolute inset-0 bg-bg opacity-75"></div>}
      </div>) }
      <div className="absolute inset-0 z-10 border-2 border-sub rounded-xl hover:border-main"></div>
      <div className="relative z-10 p-4 text-text flex justify-between">
        {
            open ? 
            <div className="break-words text-[4vw] md:text-[2.25vw] lg:text-[1.75vw] xl:text-[1.25vw] text-shadow">
              {card.descriptionTxt}
            </div> 
            :
            <div>
              <div className="break-words font-bold text-text text-lg sm:text-xl md:text-2xl lg:text-3xl">
                {card.clueTxt}
              </div>
              <div className="flex justify-between items-end mt-auto">
                <div className="text-text text-sm">{card.nFrequency}x</div>
                {card.pctCorrect && (
                  <div className="text-main text-sm">{Math.round(((card.pctCorrect ?? 0) * 100))}%</div>
                )}
              </div>
            </div>
        }
        <div>
          { card.id !== emptyCard.id && <MoreVertIcon
            onClick={actionEdit}
            className="text-text cursor-pointer mt-1 hover:text-main"
          />}
        </div>
      </div>
    </div>
  );
};

export default Card;