import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Dropdown from "./components/Dropdown";
import { getIdToken } from "../../firebase";
import { useAccount, useAlert } from "../../store";
import useCard from "./components/Card/store";
import ICardCategory, { defaultCardCategory } from "../../interfaces/ICardCategory";
import { serviceCardCategoryGetList } from "../../services/ServiceCardCategory";
import { serviceCardGetList } from "../../services/ServiceCard";
import { defaultCard, emptyCard } from "../../interfaces/ICard";
import { CustomPopup } from "../../components/PopUp";
import usePopup from "./components/Popup/store";
import CardCategory from "./components/Popup/CardCategory";
import CardPopup from "./components/Popup/Card";
import Card from "./components/Card";
import { useHomeDropdown } from "./components/Dropdown/store";
import { useLoading } from "../../components/Loading";
import { asyncProcess } from "../../utils/loading";

export default () => {
  const [ firstRender, setFirstRender ] = useState(true);
  const [ firstRender2, setFirstRender2 ] = useState(true);
  const { account } = useAccount();
  const dropdown = useHomeDropdown();
  const card = useCard();
  const popup = usePopup();
  const loading = useLoading();
  const alert = useAlert();

  useEffect(() => {
    const fetchCardCategories = async () => {
      const token = await getIdToken();
      const categories : ICardCategory[] = await (await serviceCardCategoryGetList(token, account.id)).json();
      const defaultCategory = (categories.find(p => p.name === "default")) || (categories.length > 0 ? categories[0] : defaultCardCategory);
      dropdown.setCardCategories(categories);
      dropdown.setPrevSelectedCardCategory(dropdown.selectedCardCategory);
      dropdown.setSelectedCardCategory(
        dropdown.selectedCardCategory.name
          ? categories.find(p => p.id === dropdown.selectedCardCategory.id) || defaultCategory
          : defaultCategory
      );
      setFirstRender(false);
    };

    if(firstRender && dropdown.cardCategories.length != 0) setFirstRender(false)
    else asyncProcess(fetchCardCategories, alert, loading);
  }, [dropdown.refresh]);

  useEffect(() => {
    const fetchCards = async (categoryId: string) => {
      setFirstRender2(false)
      if (!categoryId) return;
      const token = await getIdToken();
      const cards = (await (await serviceCardGetList(token, categoryId, "SortOrder=desc")).json()).items;
      card.setCards(cards);
    };

    if(firstRender2 && dropdown.cardCategories.length != 0) setFirstRender2(false)
    else asyncProcess(() => fetchCards(dropdown.selectedCardCategory.id), alert, loading);
  }, [dropdown.selectedCardCategory, card.refresh, dropdown.refresh]);

  useEffect(() => {
    if(card.cards.length != 0) return;
    card.setCards([emptyCard]);
  }, [card.cards])

  return (
    <div>
      <Header />
      <div className="custom-page">
        <div className="my-4 flex justify-between">
          <Dropdown dropdown={dropdown}/>
          <button onClick={() => { popup.setSelectedCard(defaultCard); popup.setStateCard("add"); popup.setIsCardOpen(true) }} className="text-main font-bold custom-text-1">Add</button>
        </div>
        <hr className="border-t-2 border-sub" />
        <div className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {card.cards.map((item) => (
              <Card key={item.id} card={item} />
            ))}
          </div>
        </div>
      </div>
      <CustomPopup isOpen={popup.isCardCategoryOpen} children={<CardCategory/>}/>
      <CustomPopup isOpen={popup.isCardOpen} children={<CardPopup/>}/>
    </div>
  );
};
