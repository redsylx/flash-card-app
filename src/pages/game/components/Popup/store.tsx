import { create } from 'zustand';

type Selection = "resume" | "new" | "";

type PopupState = {
  show: boolean;
  selection: Selection;
  setShow: (data: boolean) => void;
  setSelection: (data: Selection) => void;
}

const usePopup = create<PopupState>((set) => ({
  show: false,
  selection: "",
  setShow: (data: boolean) => set({show: data}),
  setSelection: (data: Selection) => set({selection: data})
}));

export default usePopup;