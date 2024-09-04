import { useEffect } from "react";
import Header from "../../components/Header";
import { useLoading } from "../../components/Loading";
import { getIdToken } from "../../firebase";
import { serviceCardGetListByAccount } from "../../services/ServiceCard";
import { useAccount } from "../../store";
import Table from "./components/Table";
import useTable from "./components/Table/store";
import { IPaginationResult } from "../../interfaces/IPaginationResult";
import ICard from "../../interfaces/ICard";

export default () => {
  const { account } = useAccount();
  const table = useTable();
  const loading = useLoading();

  useEffect(() => {
    const fetchCards = async () => {
      loading.setLoading(true);
      const token = await getIdToken();
      const prCards : IPaginationResult<ICard> = (await (await serviceCardGetListByAccount(token, account.id, "SortField=cluetxt", "SortOrder=asc", `pagesize=${table.paginationResult.pageSize}`, `pageNumber=${table.paginationResult.pageNumber}`)).json());
      table.setItems(prCards.items);
      table.setPaginationResult(prCards);
      loading.setLoading(false);
    };

    fetchCards();
  }, [table.paginationResult.isChange]);

  return(
    <div>
      <Header />
      <div className="custom-page">
        <div className="my-4 flex justify-between">
        </div>
        <hr className="border-t-2 border-sub" />
        <div className="pt-4">
          <Table/>
        </div>
      </div>
    </div>
  )
}