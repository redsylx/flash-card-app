import { useCardTableStateLibrary } from "../../../../store";
import { usePopup } from "./store";

export default () => {
  const table = useCardTableStateLibrary();
  const card = table.selectedItem;
  const popup = usePopup();

  return(
    <div>
        { card.clueImgUrl && (<img src={card.clueImgUrl} className='rounded-lg object-cover w-full mb-4'/>)}
        <p className="custom-text-4 text-text mb-4">{ card.clueTxt }</p>
        <p className="custom-text-1 text-main">{card.categoryName}</p>
        <p className="custom-text-1 text-text my-4">{card.descriptionTxt}</p>
        <button onClick={() => popup.setIsOpen(false)} className="custom-button w-full rounded-lg h-10">
            Close
        </button>
    </div>
  )
}