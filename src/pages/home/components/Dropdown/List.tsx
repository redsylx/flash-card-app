import { Edit } from "@mui/icons-material";
import usePopup from "../Popup/store";
import ICardCategory from "../../../../interfaces/ICardCategory";
import { getIdToken } from "../../../../firebase";
import { serviceCardCategoryCreate } from "../../../../services/ServiceCardCategory";
import { useAccount, useAlert } from "../../../../store";
import { DropdownState } from "./store";
import { asyncProcess } from "../../../../utils/loading";
import { useLoading } from "../../../../components/Loading";

interface IProps {
    dropdown: DropdownState;
}

const List : React.FC<IProps> = ({ dropdown }) => {
  const alert = useAlert();
  const loading = useLoading();
  const account = useAccount();
  const popup = usePopup();
  const lastOptions = dropdown.cardCategoriesToShow[Math.max(0, dropdown.cardCategoriesToShow.length-1)];

  const handleCategoryClick = async (option: ICardCategory) => {
      dropdown.setSelectedCardCategory(option);
      dropdown.setIsOpen(false);
  };

  const createCardCategory = async () => {
    const token = await getIdToken();
    await serviceCardCategoryCreate(token, account.account.id, dropdown.searchTerm);
    dropdown.setRefresh(!dropdown.refresh);
  }
  
  const onCreateCardCategory = () => {
    asyncProcess(createCardCategory, alert, loading);
  }

  return (
      <div>
      {dropdown.cardCategoriesToShow.length > 0 ? dropdown.cardCategoriesToShow.map((cardCategory) => (
          <div
          key={cardCategory.id}
          onClick={() => handleCategoryClick(cardCategory)}
          className={`flex justify-between items-center bg-bg px-4 py-4 custom-text-1 text-text hover:bg-sub-alt cursor-pointer ${cardCategory === lastOptions ? 'rounded-b-xl' : ''}`}
          >
          <p>{cardCategory.name}</p>
          <div className="flex justify-end items-center">
              <p className="me-4">{cardCategory.nCard} item</p>
              <div onClick={(e) => {
                  e.stopPropagation();
                  popup.setSelectedCardCategory(cardCategory);
                  popup.setIsCardCategoryOpen(true)
              }}>
                <Edit fontSize="small" className="text-text cursor-pointer mt-1 hover:text-main"/>
              </div>
          </div>
          </div>
      ))
      : 
          <div
          key="create"
          onClick={onCreateCardCategory}
          className="bg-bg px-4 py-4 custom-text-1 text-text hover:bg-sub-alt cursor-pointer rounded-b-xl"
          >
          <p>
              Add <span className="font-bold text-main">{dropdown.searchTerm}</span>
          </p>
          </div>
      }
      </div>
  );
};

export default List;