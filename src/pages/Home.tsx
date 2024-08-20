import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAppSelector, useAuthState, useFetchUser } from "../hooks";
import Dropdown, { Option } from "../components/Dropdown";
import { getIdToken } from "../firebase";
import { serviceCardCategoryCreate, serviceCardCategoryGetList } from "../services/ServiceCardCategory";
import { serviceAuthGet } from "../services/ServiceAuth";

interface CardProps {
  clueTxt: string;
  frequency: number;
  pctCorrect: number | null;
  descriptionTxt: string;
  isNew?: boolean;
  isActive?: boolean;
}

const Card: React.FC<CardProps> = ({ clueTxt, frequency, pctCorrect, isNew, descriptionTxt, isActive }) => {
  return (
    <div className="relative bg-bg border-2 border-sub p-4 rounded-xl text-text flex flex-col justify-between aspect-[16/9] md:aspect-[3/2] lg:aspect-[4/3] xl:aspect-[1/1] 2xl:aspect-[3/4]">
      {isNew && <div className="text-main custom-text-1">new</div>}
      
      {isActive ? (
        <div className="break-words text-text text-[4vw] md:text-[2.25vw] lg:text-[1.75vw] xl:text-[1.25vw]">
          {descriptionTxt}
        </div>
      ) : (
        <>
          <div className="break-words font-bold text-text text-lg sm:text-xl md:text-2xl lg:text-3xl">
            {clueTxt}
          </div>
          <div className="flex justify-between items-end mt-auto">
            <div className="text-gray-400 text-sm">{frequency}x</div>
            {pctCorrect !== null && (
              <div className="text-pink-300 text-sm">{pctCorrect}%</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const ListMemento: React.FC = () => {
  const data = [
      {
          "id": 1,
          "clueTxt": "clue with 32 char limit with img",
          "frequency": 10,
          "pctCorrect": null,
          "descriptionTxt": "meme horor viral di TikTok, tentang toilet dengan karakter seram yang muncul tiba-tiba. Biasanya dipake buat bikin video lucu.",
          "isActive": true,
      },
      {
          "id": 2,
          "clueTxt": "Sigma Male",
          "frequency": 20,
          "pctCorrect": null,
          "descriptionTxt": "Meme tentang cowok yang katanya anti-mainstream, nggak peduli aturan, tapi tetep keren. Dianggap parodi dari 'Alpha Male', tapi lebih nyantai dan absurd. Biasanya digabungin sama musik intense dan quotes deep, tapi banyak juga yang dibikin buat lucu-lucuan."
      },
      {
          "id": 3,
          "clueTxt": "NPC",
          "frequency": 30,
          "pctCorrect": null,
          "descriptionTxt": "Meme yang ngebahas orang-orang yang dianggap kayak 'Non-Playable Character' di game, alias ngikutin arus tanpa mikir sendiri. Sering dijadiin bahan buat ngeledek orang yang dianggap nggak punya pendapat sendiri. Populer karena bisa relate sama kehidupan sehari-hari."
      },
      {
          "id": 4,
          "clueTxt": "Bussin",
          "frequency": 40,
          "pctCorrect": null,
          "descriptionTxt": "Slang buat ngegambarin sesuatu yang super enak atau keren banget. Biasanya dipake pas ngomongin makanan yang mantul atau hal-hal yang bikin excited. Sering muncul di video mukbang atau review makanan."
      },
      {
          "id": 5,
          "clueTxt": "Rizz",
          "frequency": 50,
          "pctCorrect": null,
          "descriptionTxt": "Slang buat nyebut kemampuan seseorang buat ngegombal atau nge-charm orang lain. Kalo lo punya 'rizz', berarti lo jago flirting atau ngegaet hati orang. Jadi viral di TikTok gara-gara konten-konten tentang cara nge-charm orang."
      },
      {
          "id": 6,
          "clueTxt": "Touch Grass",
          "frequency": 60,
          "pctCorrect": null,
          "descriptionTxt": "Ungkapan buat nyuruh orang biar keluar rumah dan ngelakuin sesuatu di dunia nyata, bukannya kelamaan di internet. Biasanya dipake buat ngeledek orang yang terlalu sibuk sama dunia maya dan perlu 'reality check'."
      },
      {
          "id": 7,
          "clueTxt": "Cheugy",
          "frequency": 70,
          "pctCorrect": null,
          "descriptionTxt": "Meme yang dipake buat ngeledek sesuatu yang dianggap nggak keren lagi, alias basi atau out of date. Biasanya ditujukan ke tren atau gaya hidup yang dulu populer, tapi sekarang udah nggak relevan. Cheugy jadi semacam cap negatif buat sesuatu yang dianggap terlalu mainstream."
      },
      {
          "id": 8,
          "clueTxt": "Goblin Mode",
          "frequency": 80,
          "pctCorrect": null,
          "descriptionTxt": "Istilah buat ngegambarin mode hidup nggak peduli penampilan atau etika, alias hidup semaunya sendiri. Pas banget buat nyebut hari-hari malas di mana lo cuma pengen rebahan dan nggak peduli apa-apa. Jadi tren karena relatable banget di era pandemi."
      },
      {
          "id": 9,
          "clueTxt": "Dank Memes",
          "frequency": 90,
          "pctCorrect": null,
          "descriptionTxt": "Jenis meme yang sengaja dibikin absurd, nyeleneh, dan sering kali nggak masuk akal. Biasanya dibikin dengan humor gelap atau referensi internet yang deep, dan lebih dihargai di komunitas meme yang udah 'advanced'."
      },
      {
          "id": 10,
          "clueTxt": "Doomscrolling",
          "frequency": 100,
          "pctCorrect": null,
          "descriptionTxt": "Kebiasaan scroll terus-menerus di medsos, biasanya buat baca berita buruk atau konten negatif, sampai lo merasa overwhelmed atau cemas. Jadi fenomena umum di zaman digital, apalagi pas ada berita-berita besar yang bikin stres."
      }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
      {data.map((item) => (
        <Card
          key={item.id}
          clueTxt={item.clueTxt}
          descriptionTxt={item.descriptionTxt}
          frequency={item.frequency}
          pctCorrect={item.pctCorrect}
          isNew={item.frequency === 0}
          isActive={item.isActive}
        />
      ))}
    </div>
  );
};

const Home = () => {
  const authReady = useAuthState();
  const user = useAppSelector(p => p.user);
  const [nCreateCategory, setNCreateCategory] = useState(0);
  const [options, setOptions] = useState<Option[]>([]);

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

  return (
      <div>
        <Header/>
        <div className="custom-page">
          <div className="my-4">
            <Dropdown optionsProp={options} onEmptyClick={createCardCategory}/>
          </div>
          <hr className="border-t-2 border-sub"/>
          <div className="pt-4">
            <ListMemento/>
          </div>
        </div>
      </div>
  );
};

export default Home;