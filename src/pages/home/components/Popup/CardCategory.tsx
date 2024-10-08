import { ChangeEvent, useState } from "react";
import usePopup from "./store";
import { IconContainer } from "../../../../components/IconContainer";
import { Close } from "@mui/icons-material";
import { useLoading } from "../../../../components/Loading";
import { asyncProcess } from "../../../../utils/loading";
import { getIdToken } from "../../../../firebase";
import { serviceCardCategoryDelete, serviceCardCategoryUpdate } from "../../../../services/ServiceCardCategory";
import { useAccount, useAlert } from "../../../../store";
import { useHomeDropdown } from "../Dropdown/store";

export default () => {
  const popup = usePopup();
  const dropdown = useHomeDropdown();
  const { account } = useAccount();
  const [val, setVal] = useState(popup.selectedCardCategory.name);
  const alert = useAlert();
  const loading = useLoading();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setVal(event.target.value);
  }

  const updateCategoryName = async () => {
    const token = await getIdToken();
    await serviceCardCategoryUpdate(token, account.id, popup.selectedCardCategory.id, val);
    dropdown.setRefresh(!dropdown.refresh);
    popup.setIsCardCategoryOpen(false);
  }

  const deleteCategory = async () => {
    const token = await getIdToken();
    await serviceCardCategoryDelete(token, account.id, popup.selectedCardCategory.id);
    dropdown.setRefresh(!dropdown.refresh);
    popup.setIsCardCategoryOpen(false);
  }

  const onUpdateCategoryName = () => asyncProcess(updateCategoryName, alert, loading);
  const onDeleteCategory = () => asyncProcess(deleteCategory, alert, loading);

  return(
      <div className="flex flex-col justify-between h-80">
          <div>
              <div className="flex">
                  <p className="custom-text-3 font-bold text-text mb-4">Update category name</p>
                  <div onClick={() => popup.setIsCardCategoryOpen(false)}>
                      <IconContainer>
                          <Close/>
                      </IconContainer>
                  </div>
              </div>
              <input
              type="text"
              placeholder={popup.selectedCardCategory.name}
              value={val}
              onChange={handleInputChange}
              className="w-full custom-text-1 text-sub bg-bg border-b-2 border-sub placeholder-sub-alt font-bold focus:outline-none focus:border-round-xl"
              />
          </div>
          <div className="grid grid-cols-2 gap-4">
              <button onClick={onDeleteCategory} className="font-bold bg-bg border-2 border-sub-alt text-sub hover:bg-error-1 hover:border-error-1 hover:text-bg py-2 rounded-lg">Delete</button>
              <button onClick={onUpdateCategoryName} className="custom-button py-2 rounded-lg">Update</button>
          </div>
      </div>
  )
}