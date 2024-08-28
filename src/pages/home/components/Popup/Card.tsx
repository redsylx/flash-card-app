import { ChangeEvent, useEffect } from "react";
import useCard from "../Card/store";
import usePopup, { PopupCardState } from "./store";
import { useLoading } from "../../../../components/Loading";
import { asyncProcess } from "../../../../utils/loading";
import { getIdToken } from "../../../../firebase";
import { IGetUploadProp, serviceUpload, serviceUploadGetUploadImageUrl } from "../../../../services/ServiceUpload";
import { serviceCardCreate, serviceCardDelete, serviceCardUpdate } from "../../../../services/ServiceCard";
import { IconContainer } from "../../../../components/IconContainer";
import { Close } from "@mui/icons-material";
import ImageUploader from "../ImageUploader";
import useImageUploader from "../ImageUploader/store";
import { useHomeDropdown } from "../Dropdown/store";

export default () => {
  const card = useCard();
  const popup = usePopup();
  const loading = useLoading();
  const dropdown = useHomeDropdown();
  const image = useImageUploader();

  useEffect(() => image.setPreviewUrl(popup.selectedCard.clueImgUrl), [])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    popup.setModifiedCard(({
        ...popup.modifiedCard,
        [event.target.name]: event.target.value
    }));
  }

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    popup.setModifiedCard(({
      ...popup.modifiedCard,
      [event.target.name]: event.target.value
    }));
  }

  const createCard = async () => {
    loading.setLoading(true)
    await asyncProcess(async () => {
      const token = await getIdToken();
      popup.modifiedCard.cardCategory = dropdown.selectedCardCategory;
      if(image.image) {
        const uploadRes : IGetUploadProp = await (await serviceUploadGetUploadImageUrl(token, image.image.name)).json();
        try {
          await serviceUpload(image.image, uploadRes);
          popup.modifiedCard.clueImg = uploadRes.fileName;
        } catch (e) {
          console.error(e);
        }
      }
      await serviceCardCreate(token, popup.modifiedCard);
      card.setRefresh(!card.refresh)
      dropdown.setRefresh(!dropdown.refresh)
    })
    popup.setIsCardOpen(false);
    loading.setLoading(false)
  }

  const updateCard = async () => {
    loading.setLoading(true)
    await asyncProcess(async () => {
      const token = await getIdToken();
      if(image.previewUrl != popup.modifiedCard.clueImgUrl) popup.modifiedCard.clueImg = "";
      if(image.previewUrl != popup.modifiedCard.clueImgUrl && image.image) {
        const uploadRes : IGetUploadProp = await (await serviceUploadGetUploadImageUrl(token, image.image.name)).json();
        try {
          await serviceUpload(image.image, uploadRes);
          popup.modifiedCard.clueImg = uploadRes.fileName;
        } catch (e) {
          console.error(e);
        }
      }
      await serviceCardUpdate(token, popup.modifiedCard);
      card.setRefresh(!card.refresh);
      dropdown.setRefresh(!dropdown.refresh);
    })
    popup.setIsCardOpen(false);
    loading.setLoading(false)
  }

  const deleteCard = async () => {
    loading.setLoading(true)
    await asyncProcess(async () => {
      const token = await getIdToken();
      await serviceCardDelete(token, popup.modifiedCard.id);
      card.setRefresh(!card.refresh);
      dropdown.setRefresh(!dropdown.refresh);
    })
    popup.setIsCardOpen(false);
    loading.setLoading(false)
  }

  const checkType = (checkType: PopupCardState) : boolean => {
    return popup.stateCard === checkType;
  } 

  return(
      <div className="flex flex-col justify-between">
          <div className="mb-4">
              <div className="flex justify-between">
                  <p className="custom-text-3 font-bold text-text">{ checkType("update") ? "Update Memento" : "Add Memento" }</p>
                  <div onClick={() => popup.setIsCardOpen(false)}>
                      <IconContainer>
                          <Close/>
                      </IconContainer>
                  </div>
              </div>
              <p className="custom-text-1 text-main mt-4 mb-4">{dropdown.selectedCardCategory.name}</p>
              <input
              type="text"
              placeholder={popup.selectedCard.clueTxt ? popup.selectedCard.clueTxt : "Clue (max 32 char)"}
              value={popup.modifiedCard.clueTxt}
              onChange={handleInputChange}
              name="clueTxt"
              className="w-full p-2 mb-4 custom-text-1 text-sub bg-bg border-2 rounded-lg border-sub-alt placeholder-sub-alt font-bold focus:outline-none focus:border-sub"
              />
              <textarea 
              className="mb-4 break-words w-full p-2 bg-bg text-sub font-bold border-2 rounded-lg border-sub-alt focus:outline-none focus:border-sub placeholder-sub-alt resize-none overflow-hidden"
              rows={4}
              placeholder={popup.selectedCard.descriptionTxt ? popup.selectedCard.descriptionTxt : "Description (max 128 char)"}
              value={popup.modifiedCard.descriptionTxt}
              onChange={handleTextAreaChange}
              name="descriptionTxt"
              />
              <ImageUploader/>
          </div>
          {
            checkType("update") 
            ? (<div className="grid grid-cols-2 gap-4">
              <button onClick={deleteCard} className="custom-button-alert py-2 rounded-lg">Delete</button>
              <button onClick={updateCard} className="custom-button py-2 rounded-lg">Update</button>
              </div>)
            : (<button className="custom-button mt-2 py-2 rounded-lg" onClick={createCard}>create</button>)
          }
      </div>
  )
}