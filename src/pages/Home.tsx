import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAppSelector, useAuthState, useFetchUser } from "../hooks";
import Dropdown, { Option } from "../components/Dropdown";
import { getIdToken } from "../firebase";
import { serviceCardCategoryCreate, serviceCardCategoryGetList } from "../services/ServiceCardCategory";
import { Card, ListMemento } from "../components/ListMemento";
import { serviceCardGetList } from "../services/ServiceCard";

const Home = () => {
  const authReady = useAuthState();
  const user = useAppSelector(p => p.user);
  const [nCreateCategory, setNCreateCategory] = useState(0);
  const [options, setOptions] = useState<Option[]>([]);
  const [listMemento, setListMemento] = useState<Card[]>([]);

  useFetchUser(authReady);
  
  useEffect(() => {
    if(!authReady || !user.id) return;
    const getOptions = async () => {
      const token = await getIdToken();
      const res : Option[] = await (await serviceCardCategoryGetList(token, user.id)).json();
      setOptions(res);
    }

    getOptions();
  }, [authReady, user, nCreateCategory])

  const createCardCategory = async (newCategoryName: string) => {
    const token = await getIdToken();
    await (await serviceCardCategoryCreate(token, user.id, newCategoryName)).json();
    setNCreateCategory(nCreateCategory + 1);
  }

  const getCardCategory = async (categoryId: string) => {
    const token = await getIdToken();
    const result : Card[] = (await (await serviceCardGetList(token, categoryId)).json()).items;
    setListMemento(result)
  }

  return (
      <div>
        <Header/>
        <div className="custom-page">
          <div className="my-4">
            <Dropdown optionsProp={options} onEmptyClick={createCardCategory} onOptionChange={getCardCategory}/>
          </div>
          <hr className="border-t-2 border-sub"/>
          <div className="pt-4">
            <ListMemento listMemento={listMemento}/>
          </div>
        </div>
      </div>
  );
};

export default Home;