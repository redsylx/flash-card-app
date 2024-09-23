import { useEffect, useState } from "react";
import Header from "../../components/Header"
import { serviceCardCategoryGetList } from "../../services/ServiceCardCategory";
import { useAccount, useAlert } from "../../store";
import { getIdToken } from "../../firebase";
import ICardCategory from "../../interfaces/ICardCategory";
import { useGameDropdown, useHomeDropdown } from "../home/components/Dropdown/store";
import { defaultGame, ICreateGameDto, IGame } from "../../interfaces/IGame";
import { useLoading } from "../../components/Loading";
import { serviceGameCreate, serviceGameGetList, serviceGameGetResume } from "../../services/ServiceGame";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes";
import Dropdown from "./components/Dropdown";
import GroupButton, { useGuessTime, useNumberOfMemento } from "./components/Dropdown/GroupButton";
import { CustomPopup } from "../../components/PopUp";
import Popup from "./components/Popup";
import usePopup from "./components/Popup/store";
import GameHistoryTable from "./components/Table";
import useTable from "./components/Table/store";
import { asyncProcess } from "../../utils/loading";

export default () => {
  const homeDropdown = useHomeDropdown();
  const dropdown = useGameDropdown();
  const numberOfMemento = useNumberOfMemento();
  const guessTime = useGuessTime();
  const loading = useLoading(); 
  const { account } = useAccount();
  const [ resumeGame, setResumeGame ] = useState<IGame>(defaultGame);
  const navigate = useNavigate();
  const popup = usePopup();
  const table = useTable();
  const alert = useAlert();

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
      if(homeDropdown.cardCategories.length == 0) {
        const token = await getIdToken();
        const categories : ICardCategory[] = await (await serviceCardCategoryGetList(token, account.id)).json();
        dropdown.setCardCategories(categories.filter(p => p.nCard !== 0));
      } else {
        dropdown.setCardCategories(homeDropdown.cardCategories.filter(p => p.nCard !== 0))
      }
    };

    const fetchGameResume = async () => {
      const token = await getIdToken();
      const resumeGame : IGame = await (await serviceGameGetResume(token, account.id)).json();
      if(!resumeGame.id) return;
      setResumeGame(resumeGame);
    }
    
    const fetchGameHistories = async () => {
      const token = await getIdToken();
      const gameHistories : IGame[] = await (await serviceGameGetList(token, account.id)).json();
      table.setGames(gameHistories.filter(p => p.status !== "playing"));
    }

    const fetchAll = async () => {
      await fetchCardCategories();
      await fetchGameResume();
      await fetchGameHistories();
    }

    asyncProcess(fetchAll, alert, loading);
  },[])

  useEffect(() => {
    if(popup.selection === "") return;
    if(popup.selection === "new") {
      popup.setSelection("");
      popup.setShow(false);
      asyncProcess(createGame, alert, loading);
    }
    else if(popup.selection === "resume") {
      popup.setSelection("");
      popup.setShow(false);
      onResumeClick();
    }
  }, [popup.selection])

  const onNewGameClick = async () => {
    if(dropdown.selectedCardCategories.length == 0) return
    

    if(resumeGame.id) {
      popup.setShow(true)
      return
    }

    asyncProcess(createGame, alert, loading);
  }

  const createGame = async () => {
    var dto : ICreateGameDto = {
      accountId: account.id,
      categoryIds: dropdown.selectedCardCategories.map(p => p.id),
      hideDurationInSecond: parseInt(guessTime.selected),
      nCard: parseInt(numberOfMemento.selected)
    }

    loading.setLoading(true)
    const token = await getIdToken();
    const game : IGame = await (await serviceGameCreate(token, dto)).json();
    navigate(ROUTES.PLAY.replace(":gameId", game.id));
  }

  const onResumeClick = () => {
    if(!resumeGame.id) return
    navigate(ROUTES.PLAY.replace(":gameId", resumeGame.id));
  }

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
          {
            resumeGame.id && (
              <button
              onClick={onResumeClick} 
              className="custom-button-alert h-16 w-60 rounded-xl custom-text-2 me-4"
              >Resume</button>)
          }
          <button
          onClick={onNewGameClick} 
          disabled={dropdown.selectedCardCategories.length == 0} 
          className="custom-button h-16 w-60 rounded-xl custom-text-2"
          >New Game</button>
        </div>
        <div>
          <GameHistoryTable/>
        </div>
        <div className="pt-8"></div>
      </div>
      <CustomPopup isOpen={popup.show} children={<Popup/>}/>
    </div>
  );
}