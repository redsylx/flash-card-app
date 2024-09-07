import { ChangeEvent, useEffect } from "react";
import { useLoading } from "../../../../components/Loading";
import { Close } from "@mui/icons-material";
import { useAccount, useCardCategoryDropdownStateStore, useImageUploaderStore } from "../../../../store";
import { usePopupSellCardCategory } from "./store";
import { IconContainer } from "../../../../components/IconContainer";
import { ImageUploader } from "../../../../components/ImageUploader";
import { asyncProcess } from "../../../../utils/loading";
import Dropdown from "../Dropdown";
import { getIdToken } from "../../../../firebase";
import { serviceSellCardCategoryCreate } from "../../../../services/ServiceSellCardCategory";
import { IGetUploadProp, serviceUpload, serviceUploadGetUploadImageUrl } from "../../../../services/ServiceUpload";
import { defaultCardCategory } from "../../../../interfaces/ICardCategory";
import { defaultSellCardCategory } from "../../../../interfaces/ISellCardCategory";

export default () => {
  const loading = useLoading();
  const image = useImageUploaderStore();
  const popup = usePopupSellCardCategory();
  const dropdown = useCardCategoryDropdownStateStore();
  const { account } = useAccount();

  useEffect(() => {
    dropdown.setItem(defaultCardCategory);
    popup.setFormItem(defaultSellCardCategory);
    image.setPreviewUrl("");
  }, [popup.isOpen])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    popup.setFormItem(({
      ...popup.formItem,
      [event.target.name]: event.target.value
    }));
  }

  const handleTextAreaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    popup.setFormItem(({
      ...popup.formItem,
      [event.target.name]: event.target.value
    }));
  }

  const createSellCardCategory = async () => {
    loading.setLoading(true)
    await asyncProcess(async () => {
      const token = await getIdToken();
      if(image.image) {
        const uploadRes : IGetUploadProp = await (await serviceUploadGetUploadImageUrl(token, image.image.name)).json();
        await serviceUpload(image.image, uploadRes);
        popup.formItem.img = uploadRes.fileName;
      }
      await serviceSellCardCategoryCreate(token, account.id, dropdown.item.id, popup.formItem);
    })
    loading.setLoading(false)
    popup.setIsOpen(false)
  }

  return (
    <div className="flex flex-col justify-between">
      <div className="mb-4">
        <div className="flex justify-between">
          <p className="custom-text-3 font-bold text-text">{"Sell Category"}</p>
          <div onClick={() => popup.setIsOpen(false)}>
            <IconContainer>
              <Close />
            </IconContainer>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <Dropdown dropdown={dropdown}/>
      </div>
      <input
        type="text"
        placeholder={popup.item.name ? popup.item.name : "Category Name (max 32 char)"}
        value={popup.formItem.name}
        onChange={handleInputChange}
        name="name"
        className="w-full p-2 mb-4 custom-text-1 text-sub bg-bg border-2 rounded-lg border-sub-alt placeholder-sub-alt font-bold focus:outline-none focus:border-sub"
      />
      <textarea
        className="mb-4 break-words w-full p-2 bg-bg text-sub font-bold border-2 rounded-lg border-sub-alt focus:outline-none focus:border-sub placeholder-sub-alt resize-none overflow-hidden"
        rows={4}
        placeholder={popup.item.description ? popup.item.description : "Description (max 128 char)"}
        value={popup.formItem.description}
        onChange={handleTextAreaChange}
        name="description"
      />
      <div className="mb-4">
        <ImageUploader image={image} />
      </div>
      <div className="grid grid-cols-1">
        <button onClick={createSellCardCategory} className="custom-button py-2 rounded-lg">Create</button>
      </div>
    </div>
  )
}