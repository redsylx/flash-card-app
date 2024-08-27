import { Edit } from "@mui/icons-material";
import usePopup from "../Popup/store";
import useDropdown from "./store";
import ICardCategory from "../../../../interfaces/ICardCategory";
import { getIdToken } from "../../../../firebase";
import { serviceCardCategoryCreate } from "../../../../services/ServiceCardCategory";
import { useAccount } from "../../../../store";

export default () => {
  const account = useAccount();
  const dropdown = useDropdown();
  const popup = usePopup();
  const lastOptions = dropdown.cardCategoriesToShow[Math.max(0, dropdown.cardCategoriesToShow.length-1)];

  const handleCategoryClick = async (option: ICardCategory) => {
      dropdown.setSelectedCardCategory(option);
      dropdown.setIsOpen(false);
  };

  const createCardCategory = async () => {
    const token = await getIdToken();
    await (await serviceCardCategoryCreate(token, account.account.id, dropdown.searchTerm)).json();
    dropdown.setRefresh(!dropdown.refresh);
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
          onClick={createCardCategory}
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