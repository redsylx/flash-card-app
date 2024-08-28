import { useEffect } from "react";
import Header from "../../components/Header"
import useDropdown, { useDropdown2 } from "../home/components/Dropdown/store";
import Dropdown from "./Dropdown";
import GroupButton, { useGuessTime, useNumberOfMemento } from "./Dropdown/GroupButton";
import { serviceCardCategoryGetList } from "../../services/ServiceCardCategory";
import { useAccount } from "../../store";
import { getIdToken } from "../../firebase";
import ICardCategory from "../../interfaces/ICardCategory";

const GameHistoryTable = () => {
  const data = [
    {
      dateTime: '10 Agustus 2024, 12:34',
      category: 'category 1, category 2',
      items: 20,
      successRate: '88,88%',
    },
    {
      dateTime: '10 Agustus 2024, 11:19',
      category: 'category 3, category 4',
      items: 25,
      successRate: '28,88%',
    },
    {
      dateTime: '10 Agustus 2024, 12:34',
      category: 'category 1, category 2',
      items: 20,
      successRate: '88,88%',
    },
    {
      dateTime: '10 Agustus 2024, 11:19',
      category: 'category 3, category 4',
      items: 25,
      successRate: '28,88%',
    },
    {
      dateTime: '10 Agustus 2024, 12:34',
      category: 'category 1, category 2',
      items: 20,
      successRate: '88,88%',
    },
    {
      dateTime: '10 Agustus 2024, 11:19',
      category: 'category 3, category 4',
      items: 25,
      successRate: '28,88%',
    },
    {
      dateTime: '10 Agustus 2024, 12:34',
      category: 'category 1, category 2',
      items: 20,
      successRate: '88,88%',
    },
    {
      dateTime: '10 Agustus 2024, 11:19',
      category: 'category 3, category 4',
      items: 25,
      successRate: '28,88%',
    },
    {
      dateTime: '10 Agustus 2024, 12:34',
      category: 'category 1, category 2',
      items: 20,
      successRate: '88,88%',
    },
    {
      dateTime: '10 Agustus 2024, 11:19',
      category: 'category 3, category 4',
      items: 25,
      successRate: '28,88%',
    },
    // Tambahin data lainnya sesuai kebutuhan...
  ];

  return (
    <div className="overflow-x-auto">
      <p className="mb-8 custom-text-4 font-bold">Game History</p>
      <table className="min-w-full bg-bg text-text">
        <thead className="bg-sub text-left">
          <tr>
            <th className="custom-table-header">date time</th>
            <th className="custom-table-header">category</th>
            <th className="custom-table-header">items</th>
            <th className="custom-table-header">success rate</th>
            <th className="custom-table-header"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-sub">
              <td className="custom-table-row">{item.dateTime}</td>
              <td className="custom-table-row">{item.category}</td>
              <td className="custom-table-row">{item.items}</td>
              <td className="custom-table-row">{item.successRate}</td>
              <td className="custom-table-row text-text underline cursor-pointer">view detail</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default () => {
  const dropdownT = useDropdown();
  const dropdown = useDropdown2();
  const numberOfMemento = useNumberOfMemento();
  const guessTime = useGuessTime();
  const { account } = useAccount();

  useEffect(() => {
    if(numberOfMemento.vals.length == 0) {
      numberOfMemento.setVals(["10", "15", "20", "25", "30"])
      numberOfMemento.setSelected("10")
    }

    if(guessTime.vals.length == 0) {
      guessTime.setVals(["15", "30", "45", "60"])
      guessTime.setSelected("15")
    }
    
    const fetchCardCategories = async () => {
      if(dropdownT.cardCategories.length == 0) {
        const token = await getIdToken();
        const categories : ICardCategory[] = await (await serviceCardCategoryGetList(token, account.id)).json();
        dropdown.setCardCategories(categories.filter(p => p.nCard !== 0));
      } else {
        dropdown.setCardCategories(dropdownT.cardCategories.filter(p => p.nCard !== 0))
      }
    };

    fetchCardCategories();
  },[])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="custom-page flex flex-col mt-8">
        {/* Top div */}
        <div className="grid grid-cols-3 my-4 h-[300px]">
          <div>
            <p className="custom-text-3 font-bold mb-6">Categories</p>
            <Dropdown dropdown={dropdown}/>
          </div>
          <div>
            <p className="text-center custom-text-3 mb-8 font-bold">Number of Memento</p>
            <div className="flex justify-center">
              <GroupButton group={numberOfMemento}/>
            </div>
          </div>
          <div>
            <p className="text-right custom-text-3 mb-8 font-bold">Guess Time</p>
            <div className="flex justify-end">
              <GroupButton group={guessTime}/>
            </div>
          </div>
        </div>
        
        {/* Middle div */}
        <div className="flex justify-center h-[300px]">
            <button disabled={dropdown.selectedCardCategories.length == 0} className="custom-button h-16 w-40 rounded-xl custom-text-2">Play</button>
        </div>
        <div>
          <GameHistoryTable/>
        </div>
        <div className="pt-8"></div>
      </div>
    </div>
  );
}