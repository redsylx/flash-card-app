import { useEffect } from "react";
import Header from "../../components/Header";
import { useLoading } from "../../components/Loading";
import { getIdToken } from "../../firebase";
import { serviceCardGetListByAccount } from "../../services/ServiceCard";
import { useAccount, useCardTableStateLibrary } from "../../store";
import { IPaginationResult } from "../../interfaces/IPaginationResult";
import ICard from "../../interfaces/ICard";
import { CustomPopup } from "../../components/PopUp";
import { usePopup } from "./components/Popup/store";
import Popup from "./components/Popup";
import SearchBar from "./components/SearchBar";
import { useSearchBar } from "./components/SearchBar/store";
import Table from "./components/Table";

export default () => {
  const { account } = useAccount();
  const table = useCardTableStateLibrary();
  const loading = useLoading();
  const popup = usePopup();
  const searchBar = useSearchBar();

  useEffect(() => {
    searchBar.setCategories(["clue", "category"]);
  }, [])

  const getSortField = (header: string) => {
    let sortField = "clueTxt";
    switch(header) {
      case "clue": sortField = "clueTxt"; break;
      case "category": sortField = "cardCategory.name"; break;
      case "freq": sortField = "nFrequency"; break;
      case "success rate": sortField = "pctCorrect"; break;
      case "created date": sortField = "createdTime"; break;
    }
    return sortField;
  }

  const getSort = (isDescending: boolean) => {
    return isDescending ? "desc" : "asc";
  }

  useEffect(() => {
    const fetchCards = async () => {
      if(table.order === "") table.setOrder("clue")
      loading.setLoading(true);
      const token = await getIdToken();
      const prCards : IPaginationResult<ICard> = (await (await serviceCardGetListByAccount(token, account.id, `SearchKeyword=${searchBar.keyword}`, `SearchField=${getSortField(searchBar.category)}`, `SortField=${getSortField(table.order)}`, `SortOrder=${getSort(table.isDescending)}`, `pagesize=${table.paginationResult.pageSize}`, `pageNumber=${table.paginationResult.pageNumber}`)).json());
      table.setItems(prCards.items);
      table.setPaginationResult(prCards);
      loading.setLoading(false);
    };

    fetchCards();
  }, [table.refresh]);

  return(
    <div>
      <Header />
      <div className="custom-page">
        <div className="my-4 flex justify-between">
        <SearchBar/>
        </div>
        <hr className="border-t-2 border-sub" />
        
        <div className="pt-4">
          <Table/>
        </div>
      </div>
      <CustomPopup isOpen={popup.isOpen} children={<Popup/>}/>
    </div>
  )
}