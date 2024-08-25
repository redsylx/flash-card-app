import { ChangeEvent, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { useAppSelector, useAuthState, useFetchUser } from "../hooks";
import Dropdown, { defaultCardCategory, ICardCategory } from "../components/Dropdown";
import { getIdToken } from "../firebase";
import { serviceCardCategoryCreate, serviceCardCategoryGetList } from "../services/ServiceCardCategory";
import { ICard, ListMemento } from "../components/ListMemento";
import { serviceCardCreate, serviceCardGetList } from "../services/ServiceCard";
import { useHome } from "../contexts/Home";
import { CustomPopup } from "../components/PopUp";
import { useLoading } from "../contexts/Loading";
import { IconContainer } from "../components/CustomIcon";
import { Close } from "@mui/icons-material";
import { asyncProcess } from "../utils/loading";
import { IGetUploadProp, serviceUpload, serviceUploadGetUploadImageUrl

 } from "../services/ServiceUpload";

interface ImageUploaderProps {
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({setImage}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]; // Mengambil file pertama dari input

      if (file) {
          setImage(file);
          const reader = new FileReader();
          reader.onloadend = () => {
              setPreview(reader.result as string); // Memastikan hasilnya adalah string (data URL)
          };
          reader.readAsDataURL(file);
      }
  };

  const handleButtonClick = () => {
    inputFileRef.current?.click(); // Trigger input file ketika button di-click
  };

  return (
      <div className="flex items-center">
        <div className="me-4">
          {preview ? (
              <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover border-2 border-sub rounded-lg"
              />
          ) : (
            <div className="w-32 h-32 border-2 border-sub-alt rounded-lg"></div>
          )}
        </div>
        <div>
          <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={inputFileRef}
              className="hidden"
          />
          <button
              onClick={handleButtonClick}
              className="bg-sub text-text px-4 py-2 rounded-lg"
          >
              Select Image
          </button>
        </div>
      </div>
  );
};

interface MementoFormProps {
  setPopup: (value: boolean) => void;
  memento?: ICard;
  category?: ICardCategory;
}

const MementoForm : React.FC<MementoFormProps>= ({ setPopup, memento, category }) => {
  const defaultCard: ICard = {
    clueTxt: '',
    clueImg: '',
    nFrequency: 0,
    nCorrect: 0,
    pctCorrect: null,
    id: '',
    descriptionTxt: '',
  };

  const [val, setVal] = useState<ICard>(defaultCard);
  const user = useAppSelector(p => p.user)
  const { setIsLoading } = useLoading();
  const [image, setImage] = useState<File | null>(null);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVal(prev => ({
        ...prev,
        [event.target.name]: event.target.value
    }));
  }

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setVal(prev => ({
        ...prev,
        [event.target.name]: event.target.value
    }));
  }

  const createCard = async () => {
    setIsLoading(true)
    await asyncProcess(async () => {
      const token = await getIdToken();
      if(image) {
        const uploadRes : IGetUploadProp = await (await serviceUploadGetUploadImageUrl(token, image.name)).json();
        try {
          await serviceUpload(image, uploadRes);
          val.clueImg = uploadRes.fileName;
        } catch (e) {
          console.error(e);
        }
      }
      await serviceCardCreate(token, val);
    })
    setPopup(false);
    setIsLoading(false)
  }

  useEffect(() => {
    setVal(prev => ({
      ...prev,
      cardCategory: category
    }))
  }, [category]);

  return(
      <div className="flex flex-col justify-between">
          <div className="mb-4">
              <div className="flex justify-between">
                  <p className="custom-text-3 font-bold text-text">Add Memento</p>
                  <div onClick={() => setPopup(false)}>
                      <IconContainer>
                          <Close/>
                      </IconContainer>
                  </div>
              </div>
              <p className="custom-text-1 text-main mt-4 mb-4">{category?.name}</p>
              <input
              type="text"
              placeholder={memento?.clueTxt ?? "Clue (max 32 char)"}
              value={val.clueTxt}
              onChange={handleInputChange}
              name="clueTxt"
              className="w-full p-2 mb-4 custom-text-1 text-sub bg-bg border-2 rounded-lg border-sub-alt placeholder-sub-alt font-bold focus:outline-none focus:border-sub"
              />
              <textarea 
              className="mb-4 break-words w-full p-2 bg-bg text-sub font-bold border-2 rounded-lg border-sub-alt focus:outline-none focus:border-sub placeholder-sub-alt resize-none overflow-hidden"
              rows={4}
              value={val.descriptionTxt}
              onChange={handleTextAreaChange}
              name="descriptionTxt"
              />
              <ImageUploader setImage={setImage}/>
          </div>
          <button className="custom-button mt-2 py-2 rounded-lg" onClick={createCard}>create</button>
      </div>
  )
}

const Home = () => {
  const authReady = useAuthState();
  const user = useAppSelector(p => p.user);
  const [cardCategories, setCardCategories] = useState<ICardCategory[]>([]);
  const [cardCategorySelected, setCardCategorySelected] = useState<ICardCategory>();
  const [cards, setCards] = useState<ICard[]>([]);
  const { refreshDropdown, setRefreshDropdown} = useHome();
  const [popUpMemento, setPopUpMemento] = useState(false);
  const [selectedMemento, setSelectedMemento] = useState<ICard>();

  useFetchUser(authReady);
  
  useEffect(() => {
    if(!authReady || !user.id) return;
    const getOptions = async () => {
      const token = await getIdToken();
      const res : ICardCategory[] = await (await serviceCardCategoryGetList(token, user.id)).json();
      setCardCategories(res);
    }

    getOptions();
  }, [authReady, user, refreshDropdown])

  const createCardCategory = async (newCategoryName: string) => {
    const token = await getIdToken();
    await (await serviceCardCategoryCreate(token, user.id, newCategoryName)).json();
    setRefreshDropdown(!refreshDropdown);
  }

  const getCardCategory = async (cardCategory: ICardCategory) => {
    setCardCategorySelected(cardCategory);
    const token = await getIdToken();
    const result : ICard[] = (await (await serviceCardGetList(token, cardCategory.id)).json()).items;
    setCards(result)
  }

  return (
    <div>
      <Header/>
      <div className="custom-page">
        <div className="my-4 flex justify-between">
          <Dropdown optionsProp={cardCategories} onEmptyClick={createCardCategory} onOptionChange={getCardCategory}/>
          <button onClick={() => setPopUpMemento(true)} className="text-main font-bold custom-text-1">Add</button>
        </div>
        <hr className="border-t-2 border-sub"/>
        <div className="pt-4">
          <ListMemento listMemento={cards}/>
        </div>
      </div>
      <CustomPopup isOpen={popUpMemento} children={<MementoForm setPopup={setPopUpMemento} memento={selectedMemento} category={cardCategorySelected}/>}/>
    </div>
  );
};

export default Home;