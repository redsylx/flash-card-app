import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IGame } from '../../interfaces/IGame';
import { getIdToken } from '../../firebase';
import { serviceGameGet } from '../../services/ServiceGame';
import { useAccount } from '../../store';
import { defaultGameDetail, IGameDetail } from '../../interfaces/IGameDetail';
import { serviceGameDetailGetAll } from '../../services/ServiceGameDetail';
import usePlay from './store';
import { useLoading } from '../../components/Loading';

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
  const [show, setShow] = useState(false);
  const [countdown, setCountdown] = useState(15);
  const { account } = useAccount();
  const play = usePlay();
  const loading = useLoading();

  useEffect(() => {
    const fetchData = async () => {
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
        play.setSelectedGameDetail(gameDetails[0])
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
    if (countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setShow(true);
    }
  }, [countdown]);

  const answer = (isCorrect: boolean) => {
    play.selectedGameDetail.isAnswered = true;
    play.selectedGameDetail.isCorrect = isCorrect;
    var maxIndex = play.game.nCard - 1;
    var nextIndex = play.selectedGameDetail.indexNumber + 1;
    if(nextIndex > maxIndex) return
    play.setSelectedGameDetail(play.gameDetails[nextIndex]);
    setShow(false);
    setCountdown(play.game.hideDurationInSecond);
  }

  return (
    <div className="custom-page-play">
      <div className="min-h-screen flex flex-col justify-between">
        <div className='flex gap-x-2'>
          { play.gameDetails.map(p => (<LineBar gameDetail={p} key={p.id}/>)) }
        </div>
        <div className='grid grid-cols-2 min-w-full'>
          <div className="flex felx-col items-center justify-center">
            <div className="max-w-[400px]">
              { play.selectedGameDetail.card.clueImgUrl && (<img src={play.selectedGameDetail.card.clueImgUrl} className='rounded-xl object-cover max-w-[300px] mb-8'/>)}
              <p className="custom-text-4-height text-text mb-4">{ play.selectedGameDetail.card.clueTxt }</p>
              <p className="custom-text-1 text-main">{play.selectedGameDetail.categoryName}</p>
              <p className={`custom-text-1 text-text mt-8 ${show ? '' : 'hidden'}`}>{play.selectedGameDetail.card.descriptionTxt}</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center relative">
            <div className="max-w-[400px] flex flex-col items-center">
              {!show ? (
                <>
                  <p className="text-6xl text-text mb-4">{countdown}</p>
                  <button
                    onClick={() => setShow(true)}
                    className="custom-button px-4 rounded-xl py-2 custom-text-1 text-center mt-2"
                  >
                    Show
                  </button>
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
        <div className=''></div>
      </div>
    </div>
  );
};
