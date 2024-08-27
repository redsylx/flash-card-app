// // import { ChangeEvent, useEffect, useRef, useState } from "react";
// // import Header from "../components/Header";
// // import { useAppSelector, useAuthState, useFetchUser } from "../hooks";
// // import Dropdown, { ICardCategory } from "../components/Dropdown";
// // import { getIdToken } from "../firebase";
// // import { serviceCardCategoryCreate, serviceCardCategoryGetList } from "../services/ServiceCardCategory";
// // import { ICard, ListMemento } from "../components/ListMemento";
// // import { serviceCardCreate, serviceCardDelete, serviceCardGetList, serviceCardUpdate } from "../services/ServiceCard";
// // import { useHome } from "../contexts/Home";
// // import { CustomPopup } from "../components/PopUp";
// // import { useLoading } from "../contexts/Loading";
// // import { IconContainer } from "../components/CustomIcon";
// // import { Close } from "@mui/icons-material";
// // import { asyncProcess } from "../utils/loading";
// // import { IGetUploadProp, serviceUpload, serviceUploadGetUploadImageUrl

// //  } from "../services/ServiceUpload";

// interface ImageUploaderProps {
//   setImage: React.Dispatch<React.SetStateAction<File | null>>;
//   imageUrl?: string;
//   setCurrentImage: React.Dispatch<React.SetStateAction<string>>;
// }

// const ImageUploader: React.FC<ImageUploaderProps> = ({ setImage, imageUrl, setCurrentImage }) => {
//   const [preview, setPreview] = useState<string | null>(null);
//   const inputFileRef = useRef<HTMLInputElement | null>(null);

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];

//     if (file) {
//       setImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result as string);
//         setCurrentImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRemoveImage = () => {
//     setImage(null);
//     setPreview(null);
//     setCurrentImage("");
//     if (inputFileRef.current) {
//       inputFileRef.current.value = '';
//     }
//   };

//   useEffect(() => {
//     imageUrl && setPreview(imageUrl);
//   }, [imageUrl]);

//   const handleButtonClick = () => {
//     inputFileRef.current?.click();
//   };

//   return (
//     <div className="flex items-center">
//       <div className="me-4">
//         {preview ? (
//           <img
//             src={preview}
//             alt="Preview"
//             className="w-32 h-32 object-cover border-2 border-sub rounded-lg"
//           />
//         ) : (
//           <div className="w-32 h-32 border-2 border-sub-alt rounded-lg"></div>
//         )}
//       </div>
//       <div>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           ref={inputFileRef}
//           className="hidden"
//         />
//         <div className="flex flex-col gap-2">
//           <button
//             onClick={handleButtonClick}
//             className="bg-sub text-text px-4 py-2 rounded-lg"
//           >
//             Select Image
//           </button>
//           {preview && (
//             <button
//               onClick={handleRemoveImage}
//               className="bg-error-1 text-bg px-4 py-2 rounded-lg"
//             >
//               Remove Image
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // interface MementoFormProps {
// //   setPopup: (value: boolean) => void;
// //   memento?: ICard;
// //   type: "add" | "update";
// // }

// // const MementoForm : React.FC<MementoFormProps>= ({ setPopup, memento, type }) => {
// //   const defaultCard: ICard = {
// //     clueTxt: '',
// //     clueImg: '',
// //     clueImgUrl: '',
// //     nFrequency: 0,
// //     nCorrect: 0,
// //     pctCorrect: null,
// //     id: '',
// //     descriptionTxt: '',
// //   };

// //   const [val, setVal] = useState<ICard>(defaultCard);
// //   const user = useAppSelector(p => p.user)
// //   const { setIsLoading } = useLoading();
// //   const [image, setImage] = useState<File | null>(null);
// //   const [currentImage, setCurrentImage] = useState<string>("");
// //   const { setRefreshListMemento, refreshListMemento, setRefreshDropdown, refreshDropdown, selectedCategory } = useHome();
// //   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
// //     setVal(prev => ({
// //         ...prev,
// //         [event.target.name]: event.target.value
// //     }));
// //   }

// //   const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
// //     setVal(prev => ({
// //         ...prev,
// //         [event.target.name]: event.target.value
// //     }));
// //   }

// //   const createCard = async () => {
// //     setIsLoading(true)
// //     await asyncProcess(async () => {
// //       const token = await getIdToken();
// //       if(image) {
// //         const uploadRes : IGetUploadProp = await (await serviceUploadGetUploadImageUrl(token, image.name)).json();
// //         try {
// //           await serviceUpload(image, uploadRes);
// //           val.clueImg = uploadRes.fileName;
// //         } catch (e) {
// //           console.error(e);
// //         }
// //       }
// //       await serviceCardCreate(token, val);
// //       setRefreshListMemento(!refreshListMemento)
// //       setRefreshDropdown(!refreshDropdown)
// //     })
// //     setPopup(false);
// //     setIsLoading(false)
// //   }

// //   const updateCard = async () => {
// //     setIsLoading(true)
// //     await asyncProcess(async () => {
// //       const token = await getIdToken();
// //       if(currentImage != memento?.clueImg && image) {
// //         const uploadRes : IGetUploadProp = await (await serviceUploadGetUploadImageUrl(token, image.name)).json();
// //         try {
// //           await serviceUpload(image, uploadRes);
// //           val.clueImg = uploadRes.fileName;
// //         } catch (e) {
// //           console.error(e);
// //         }
// //       }
// //       if(!currentImage) val.clueImg = "";
// //       await serviceCardUpdate(token, val);
// //       setRefreshListMemento(!refreshListMemento)
// //       setRefreshDropdown(!refreshDropdown)
// //     })
// //     setPopup(false);
// //     setIsLoading(false)
// //   }

// //   const deleteCard = async () => {
// //     setIsLoading(true)
// //     await asyncProcess(async () => {
// //       const token = await getIdToken();
// //       await serviceCardDelete(token, val.id);
// //       setRefreshListMemento(!refreshListMemento)
// //       setRefreshDropdown(!refreshDropdown)
// //     })
// //     setPopup(false);
// //     setIsLoading(false)
// //   }

// //   useEffect(() => {
// //     setVal(prev => (memento ? {
// //       ...memento,
// //       cardCategory: selectedCategory
// //     } : {
// //       ...prev,
// //       cardCategory: selectedCategory
// //     }))

// //     memento && setCurrentImage(memento.clueImg);
// //   }, [memento, selectedCategory]);

// //   const checkType = (checkType: string) : boolean => {
// //     return type === checkType;
// //   } 

// //   return(
// //       <div className="flex flex-col justify-between">
// //           <div className="mb-4">
// //               <div className="flex justify-between">
// //                   <p className="custom-text-3 font-bold text-text">{ checkType("update") ? "Update Memento" : "Add Memento" }</p>
// //                   <div onClick={() => setPopup(false)}>
// //                       <IconContainer>
// //                           <Close/>
// //                       </IconContainer>
// //                   </div>
// //               </div>
// //               <p className="custom-text-1 text-main mt-4 mb-4">{selectedCategory?.name}</p>
// //               <input
// //               type="text"
// //               placeholder={memento?.clueTxt ?? "Clue (max 32 char)"}
// //               value={val.clueTxt}
// //               onChange={handleInputChange}
// //               name="clueTxt"
// //               className="w-full p-2 mb-4 custom-text-1 text-sub bg-bg border-2 rounded-lg border-sub-alt placeholder-sub-alt font-bold focus:outline-none focus:border-sub"
// //               />
// //               <textarea 
// //               className="mb-4 break-words w-full p-2 bg-bg text-sub font-bold border-2 rounded-lg border-sub-alt focus:outline-none focus:border-sub placeholder-sub-alt resize-none overflow-hidden"
// //               rows={4}
// //               value={val.descriptionTxt}
// //               onChange={handleTextAreaChange}
// //               name="descriptionTxt"
// //               />
// //               <ImageUploader setImage={setImage} imageUrl={memento?.clueImgUrl} setCurrentImage={setCurrentImage}/>
// //           </div>
// //           {
// //             checkType("update") 
// //             ? (<div className="grid grid-cols-2 gap-4">
// //               <button onClick={deleteCard} className="custom-button-alert py-2 rounded-lg">Delete</button>
// //               <button onClick={updateCard} className="custom-button py-2 rounded-lg">Update</button>
// //               </div>)
// //             : (<button className="custom-button mt-2 py-2 rounded-lg" onClick={createCard}>create</button>)
// //           }
// //       </div>
// //   )
// // }

// // const Home = () => {
// //   const authReady = useAuthState();
// //   const user = useAppSelector(p => p.user);
// //   const [ prevSelectedCategoryId, setPrevSelectedCategoryId] = useState("");
// //   const [cardCategories, setCardCategories] = useState<ICardCategory[]>([]);
// //   const [cards, setCards] = useState<ICard[]>([]);
// //   const { refreshDropdown, setRefreshDropdown, popUpMemento, setPopUpMemento, selectedMemento, mementoFormType, setMementoFormType, refreshListMemento, selectedCategory, setSelectedCategory } = useHome();

// //   useFetchUser(authReady);
  
// //   useEffect(() => {
// //     if(!authReady || !user.id) return;
// //     const getOptions = async () => {
// //       const token = await getIdToken();
// //       const res : ICardCategory[] = await (await serviceCardCategoryGetList(token, user.id)).json();
// //       setCardCategories(res);
// //       setPrevSelectedCategoryId(selectedCategory?.id ?? "");
// //       if(selectedCategory) {
// //         setSelectedCategory(res.find(p => p.id === selectedCategory.id));
// //       } else {
// //         setSelectedCategory(res.find(p => p.name === "default"));
// //       }
// //     }

// //     getOptions();
// //   }, [authReady, user, refreshDropdown])

// //   useEffect(() => {
// //     if(!authReady || !user.id || !selectedCategory) return
// //     const run = async () => {
// //       await getCards(selectedCategory.id);
// //     }
// //     run();
// //   }, [refreshListMemento, refreshDropdown])

// //   useEffect(() => {
// //     if(!authReady || !selectedCategory || selectedCategory.id === prevSelectedCategoryId) return
// //     const run = async () => {
// //       await getCards(selectedCategory.id);
// //     }
// //     run();
// //   }, [selectedCategory])

// //   const createCardCategory = async (newCategoryName: string) => {
// //     const token = await getIdToken();
// //     await (await serviceCardCategoryCreate(token, user.id, newCategoryName)).json();
// //     setRefreshDropdown(!refreshDropdown);
// //   }

// //   const getCards = async (categoryId: string) => {
// //     const token = await getIdToken();
// //     const result : ICard[] = (await (await serviceCardGetList(token, categoryId, "SortOrder=desc")).json()).items;
// //     setCards(result)
// //   }

// //   const addMemento = () => {
// //     setMementoFormType("add");
// //     setPopUpMemento(true);
// //   }

// //   return (
// //     <div>
// //       <Header/>
// //       <div className="custom-page">
// //         <div className="my-4 flex justify-between">
// //           <Dropdown optionsProp={cardCategories} onEmptyClick={createCardCategory}/>
// //           <button onClick={addMemento} className="text-main font-bold custom-text-1">Add</button>
// //         </div>
// //         <hr className="border-t-2 border-sub"/>
// //         <div className="pt-4">
// //           <ListMemento listMemento={cards}/>
// //         </div>MementoForm
// //       </div>
// //       <CustomPopup isOpen={popUpMemento} children={<MementoForm setPopup={setPopUpMemento} memento={selectedMemento} type={mementoFormType}/>}/>
// //     </div>
// //   );
// // };

// // export default Home;