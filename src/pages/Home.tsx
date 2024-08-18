import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Delete } from '@mui/icons-material';
import { IconContainer } from "../components/CustomIcon";

interface DropdownButtonProps {
  onClick: () => void;
  selectedOption: string;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ onClick, selectedOption }) => {
  return (
    <div className="p-4 bg-sub-alt rounded-xl border-2 border-sub custom-button hover:cursor-pointer w-[300px]" onClick={onClick}>
      <button className="custom-text-1 text-left">{selectedOption}</button>
    </div>
  );
};

interface DropdownSearchProps {
  placeholder: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DropdownSearch: React.FC<DropdownSearchProps> = ({ placeholder, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={onSearchChange}
      className="w-full px-4 py-4 custom-text-1 text-text bg-bg border-b-2 border-sub placeholder-sub font-bold rounded-t-xl focus:outline-none focus:border-round-xl"
    />
  );
};

interface DropdownOptionsProps {
  keyword: string;
  options: Option[];
  onOptionClick: (option: Option) => void;
  onEmptyClick: (option: string) => void;
}

const DropdownOptions: React.FC<DropdownOptionsProps> = ({ keyword, options, onOptionClick, onEmptyClick }) => {
  const lastOptions = options[Math.max(0, options.length-1)];

  return (
    <div>
      {options.length > 0 ? options.map((option) => (
        <div
          key={option.id}
          onClick={() => onOptionClick(option)}
          className={`flex justify-between items-center bg-bg px-4 py-4 custom-text-1 text-text hover:bg-sub-alt cursor-pointer ${option === lastOptions ? 'rounded-b-xl' : ''}`}
        >
          <p>{option.name}</p>
          <div className="flex justify-end items-center">
            <p className="me-2">{option.total} item</p>
            <div onClick={(e) => {
              e.stopPropagation();
              alert(`DELETE ${option.name}`);
            }}>
              <IconContainer>
                  <Delete/>
              </IconContainer>
            </div>
          </div>
        </div>
      ))
      : 
        <div
          key="create"
          onClick={() => onEmptyClick(keyword)}
          className="bg-bg px-4 py-4 custom-text-1 text-text hover:bg-sub-alt cursor-pointer rounded-b-xl"
        >
          <p>
            Add <span className="font-bold text-main">{keyword}</span>
          </p>
        </div>
      }
    </div>
  );
};

type Option = {
  id: number;
  name: string;
  total: number;
};

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({id: 1, name: 'default', total: 0});
  const [searchTerm, setSearchTerm] = useState('');
  const tempOptions: Option[] = [
    { id: 1, name: 'default', total: 10 },
    { id: 7, name: 'politic', total: 70 },
    { id: 2, name: 'meme', total: 20 },
    { id: 8, name: 'finance', total: 80 },
    { id: 3, name: 'english', total: 30 },
    { id: 4, name: 'korea', total: 40 },
    { id: 5, name: 'tech', total: 50 },
    { id: 6, name: 'study', total: 60 },
  ];

  const [options, setOptions] = useState(tempOptions);

  let filteredOptions = options.filter(option =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  filteredOptions.sort((a, b) => {
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
  });

  useEffect(() => {
    setSearchTerm('');
  }, [isOpen])

  let optionsToShow = filteredOptions.slice(0, 10);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleEmptyClick = (newCategory: string) => {
    console.log(newCategory);
    const newOption : Option = {
      id: 100,
      name: newCategory,
      total: 999
    }
    setOptions(p => [...p, newOption]);
  }

  return (
    <div className="flex items-center">
      <div className="me-4">
        <DropdownButton onClick={toggleDropdown} selectedOption={selectedOption.name} />
        {isOpen && (
          <div className="absolute z-10 mt-4 bg-sub-alt border-2 border-sub rounded-xl min-w-[300px]">
            <DropdownSearch placeholder="find or create category" onSearchChange={(e) => setSearchTerm(e.target.value)}/>
            <DropdownOptions options={optionsToShow} onOptionClick={handleOptionClick} keyword={searchTerm} onEmptyClick={handleEmptyClick}/>
          </div>
        )}
      </div>
      <p className="">{selectedOption.total > 0 ? selectedOption.total + ' items' : ''}</p>
    </div>
  );
};

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
  useEffect(() => {
  }, []);

  return (
    true && (
      <div>
        <Header/>
        <div className="custom-page">
          <div className="my-4">
            <Dropdown/>
          </div>
          <hr className="border-t-2 border-sub"/>
          <div className="pt-4">
            <ListMemento/>
          </div>
        </div>
      </div>
    )
  );
};

export default Home;