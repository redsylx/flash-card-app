import { create } from 'zustand';
import { defaultSellCardCategory, ISellCardCategory } from '../../../../interfaces/ISellCardCategory';

interface IPopupState<T> {
  isOpen: boolean,
  setIsOpen: (data: boolean) => void,
  item: T,
  setItem: (data: T) => void,
  formItem: T,
  setFormItem: (data: T) => void
}

const createUsePopupSellCardCategory = () => create<IPopupState<ISellCardCategory>>((set) => ({
  isOpen: false,
  setIsOpen: (bool) => set(() => ({ isOpen: bool })),
  item: defaultSellCardCategory,
  setItem: (data) => set(() => ({ item: data})),
  formItem: defaultSellCardCategory,
  setFormItem: (data) => set(() => ({ formItem: data }))
}));

const usePopupSellCardCategory = createUsePopupSellCardCategory();

export {
  usePopupSellCardCategory
}
