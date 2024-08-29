import { useNavigate } from "react-router-dom";
import usePlay from "../../store"
import { ROUTES } from "../../../../routes";

export default () => {
  const play = usePlay();
  const navigate = useNavigate();

  const setStatus = () => {
    switch(play.status) {
      case "start": play.setStatus("play"); break;
      case "pause": play.setStatus("play"); break;
      default: navigate(ROUTES.GAME);
    }
  }

  return (
    <>
      <div className="flex flex-col justify-between">
          <div className="mb-4">
              <div className="flex justify-between">
                  <p className="custom-text-3 font-bold text-text mb-8">{ play.status === "finish" ? "Game Finish" : "Game Detail"}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-main">Categories</p>
                <p className="custom-text-1">{[...new Set(play.gameDetails.map(item => item.categoryName))].join(', ')}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-main">Items</p>
                <p className="custom-text-1">{play.game.nCard}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm text-main">Guess Time</p>
                <p className="custom-text-1">{play.game.hideDurationInSecond} sec</p>
              </div>
              {
                play.status === "finish" && 
                <div className="mb-4">
                  <p className="text-sm text-main">Result</p>
                  <p className="custom-text-1">{(play.game.pctCorrect ?? 0) * 100}% correct</p>
                </div>
              }
          </div>
          <button onClick={setStatus} className="custom-button py-2 rounded-lg custom-text-1">{ play.status === "start" ? 'Start' : play.status === "pause" ? 'Play' : "Back to Game Page" }</button>
      </div>
    </>
  )
}