import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { CustomPopup } from "../../components/PopUp";
import Popup from "./components/Popup";
import { usePopupSellCardCategory } from "./components/Popup/store";
import { useAccount, useCardCategory, useCardCategoryDropdownStateStore } from "../../store";
import { getIdToken } from "../../firebase";
import ICardCategory from "../../interfaces/ICardCategory";
import { serviceCardCategoryGetList } from "../../services/ServiceCardCategory";

export default () => {
  const {account} = useAccount();
  const popup = usePopupSellCardCategory();
  const [ active, setActive ] = useState("sell");
  const cardCategory = useCardCategory();
  const dropdown = useCardCategoryDropdownStateStore();

  useEffect(() => {
    const fetchCardCategories = async () => {
      const token = await getIdToken();
      const categories : ICardCategory[] = await (await serviceCardCategoryGetList(token, account.id)).json();
      cardCategory.setItems(categories);
    };

    if(cardCategory.items.length == 0) {
      fetchCardCategories()
    } else {
      dropdown.setItems(cardCategory.items)
    }
  }, [cardCategory.items])

  const openPopup = () => {
    popup.setIsOpen(true)
  }

  return(
    <div>
      <Header />
      <div className="custom-page">
        <div className="my-4 flex justify-between">
          <div>
            <button className={`font-bold text-text hover:bg-sub hover:text-text disabled:bg-bg disabled:text-sub-alt disabled:border-2 disabled:border-sub-alt w-[100px] py-2 rounded-s-xl ${active === "buy" ? 'bg-sub' : 'bg-sub-alt'}`} onClick={() => setActive("buy")}>Buy</button>
            <button className={`font-bold text-text hover:bg-sub hover:text-text disabled:bg-bg disabled:text-sub-alt disabled:border-2 disabled:border-sub-alt w-[100px] py-2 rounded-e-xl ${active === "sell" ? 'bg-sub' : 'bg-sub-alt'}`} onClick={() => setActive("sell")}>Sell</button>
          </div>
          <div>
            <button className="custom-button w-[100px] py-2 rounded-xl" onClick={openPopup}>Add</button>
          </div>
        </div>
        <hr className="border-t-2 border-sub" />
        <div className="pt-4">
          {/* <Table/> */}
        </div>
      </div>
      <CustomPopup isOpen={popup.isOpen} children={<Popup/>}/>
    </div>
  )
}