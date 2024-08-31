import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IGame } from '../../interfaces/IGame';
import { getIdToken } from '../../firebase';
import { serviceGameFinish, serviceGameGet } from '../../services/ServiceGame';
import { useAccount } from '../../store';
import { IGameDetail } from '../../interfaces/IGameDetail';
import { serviceGameDetailAnswer, serviceGameDetailGetAll } from '../../services/ServiceGameDetail';
import usePlay from './store';
import { useLoading } from '../../components/Loading';
import { IconContainer } from '../../components/IconContainer';
import { Pause, Visibility } from '@mui/icons-material';
import { CustomPopup } from '../../components/PopUp';
import Popup from './components/Popup';

interface ILineBarProp {
  gameDetail: IGameDetail
}

const LineBar : React.FC<ILineBarProp> = ({ gameDetail }) => {
  const [ status, setStatus ] = useState<"notAnswer" | "correctAnswer" | "wrongAnswer">("notAnswer");
  const play = usePlay();
  
  useEffect(() => {
    var origin = play.gameDetails[gameDetail.indexNumber];

    if(!origin.isAnswered) setStatus("notAnswer");
    else if(origin.isCorrect) setStatus("correctAnswer");
    else setStatus("wrongAnswer");
    
  }, [play.gameDetails[gameDetail.indexNumber].isAnswered])

  return (
      <div className={`flex-1 ${ status === "notAnswer" ? 'bg-sub-alt' : status === 'correctAnswer' ? 'bg-sub' : 'bg-error-1'} h-2 rounded-xl mt-8`}></div>
  )
}

export default () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [ dataFetched, setDataFetched ] = useState(false); 
  const [ showGame, setShowGame ] = useState(false);
  const [ showDescription, setShowDescription] = useState(false);
  const [ countdown, setCountdown] = useState(15);
  const { account } = useAccount();
  const play = usePlay();
  const loading = useLoading();

  useEffect(() => {
    if(play.status == "play") setShowGame(true);
    else if(play.status == "pause" || play.status == "start") setShowGame(false);
  }, [play.status])

  useEffect(() => {
    const fetchData = async () => {
      play.setStatus('start');
      if (!gameId) return;
      loading.setLoading(true);
  
      try {
        const token = await getIdToken();
        const [gameResponse, gameDetailsResponse] = await Promise.all([
          serviceGameGet(token, account.id, gameId),
          serviceGameDetailGetAll(token, gameId)
        ]);
  
        const game: IGame = await gameResponse.json();
        const gameDetails: IGameDetail[] = await gameDetailsResponse.json();
  
        play.setGame(game);
        play.setGameDetails(gameDetails);
        if(game.status == "finish" || gameDetails.filter(p => p.isAnswered == false).length === 0) play.setStatus('finish');
        play.setSelectedGameDetail(gameDetails.filter(p => p.isAnswered == false)[0])
        setCountdown(game.hideDurationInSecond);
      } catch (error) {
        console.error('Error fetching game data:', error);
      } finally {
        loading.setLoading(false);
        setDataFetched(true);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    if (countdown > 0 && play.status === "play") {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (countdown === 0) {
      setShowDescription(true);
    }
  }, [countdown, play.status]);

  const finishGame = async () => {
    try {
      const token = await getIdToken();
      const game : IGame = await (await serviceGameFinish(token, play.game.id)).json();
      play.setGame(game);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      play.setStatus("finish");
    }
  }

  const answer = async (isCorrect: boolean) => {
    play.selectedGameDetail.isAnswered = true;
    play.selectedGameDetail.isCorrect = isCorrect;
    loading.setLoading(true);
    var maxIndex = play.game.nCard - 1;
    var nextIndex = play.selectedGameDetail.indexNumber + 1;
    if(nextIndex > maxIndex) {
      await submitAnswer();
      await finishGame();
      loading.setLoading(false);
      return;
    }
    await submitAnswer();
    loading.setLoading(false);
    play.setSelectedGameDetail(play.gameDetails[nextIndex]);
    setShowDescription(false);
    setCountdown(play.game.hideDurationInSecond);
  }

  const submitAnswer = async () => {
    loading.setLoading(true);
    try {
      const token = await getIdToken();
      play.selectedGameDetail.game = play.game;
      await serviceGameDetailAnswer(token, play.selectedGameDetail);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      loading.setLoading(false);
    }
  }

  const pause = () => {
    play.setStatus("pause")
  }

  return (
    <div className="custom-page-play">
      <div className="min-h-screen flex flex-col justify-between">
        <div className='flex gap-x-2'>
          { play.gameDetails.map(p => (<LineBar gameDetail={p} key={p.id}/>)) }
        </div>
        { showGame && (
          <div className='grid grid-cols-2 min-w-full'>
            <div className="flex felx-col items-center justify-center">
              <div className="max-w-[400px]">
                { play.selectedGameDetail.clueImgUrl && (<img src={play.selectedGameDetail.clueImgUrl} className='rounded-xl object-cover max-w-[300px] mb-8'/>)}
                <p className="custom-text-4-height text-text mb-4">{ play.selectedGameDetail.clueTxt }</p>
                <p className="custom-text-1 text-main">{play.selectedGameDetail.categoryName}</p>
                <p className={`custom-text-1 text-text mt-8 ${showDescription ? '' : 'hidden'}`}>{play.selectedGameDetail.descriptionTxt}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center relative">
              <div className="max-w-[400px] flex flex-col items-center">
                {!showDescription ? (
                  <>
                    <p className="text-6xl text-text mb-4">{countdown}</p>
                    <div className='flex'>
                      <div onClick={() => setShowDescription(true)} className='me-4'>
                        <IconContainer>
                          <Visibility/>
                        </IconContainer>
                      </div>
                      <div onClick={pause}>
                        <IconContainer>
                          <Pause/>
                        </IconContainer>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <p className='custom-text-2 text-center mb-4'>Correct Guess?</p>
                    <div className='flex justify-center gap-4'>
                      <button onClick={() => answer(false)} className='px-4 py-2 rounded-xl custom-button-alert'>No</button>
                      <button onClick={() => answer(true)} className='px-4 py-2 rounded-xl custom-button'>Yes</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        <CustomPopup children={<Popup/>} isOpen={play.status === 'start' || play.status === 'pause' || play.status === 'finish'}/>
        <div className=''></div>
      </div>
    </div>
  );
};
