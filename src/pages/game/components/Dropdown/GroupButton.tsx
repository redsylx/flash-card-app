import { useEffect, useState } from "react";
import { create } from "zustand";

type GroupButton = {
  vals: string[];
  selected: string;
  setVals: (vals: string[]) => void;
  setSelected: (vals: string) => void;
}

const createStore = () => create<GroupButton>((set) => ({
  vals: [],
  selected: "",
  setVals: (vals) => set(() => ({ vals: vals })),
  setSelected: (val) => set(() => ({ selected: val })),
}));

const useNumberOfMemento = createStore();
const useGuessTime = createStore();

interface IGroupButtonProp {
  group: GroupButton
}

interface IGroupButtonUnit {
  group: GroupButton,
  val: string
}

export { useNumberOfMemento, useGuessTime };
export type { GroupButton };

const GroupButtonUnit : React.FC<IGroupButtonUnit> = ({ group, val }) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if(group.selected == val) setSelected(!selected);
    else setSelected(false);
  }, [group.selected])

  const handleClick = () => {
    group.setSelected(val);
  }

  return(
    <button onClick={handleClick} className={`${ selected ? 'w-12 h-12 text-center bg-sub-alt border-2 border-sub rounded-xl custom-text-1' : 'w-12 h-12 text-center bg-bg border-2 border-sub-alt rounded-xl custom-text-1'}`}>{val}</button>
  )
}

const GroupButton : React.FC<IGroupButtonProp> = ({ group }) => {
  return(
    <div className="flex gap-4">
      { group.vals.map(p => (
        <GroupButtonUnit group={group} val={p} key={p}/>
      ))}
    </div>)
}

export default GroupButton;