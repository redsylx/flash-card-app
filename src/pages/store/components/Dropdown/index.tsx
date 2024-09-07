import { useEffect, useRef, useState } from "react";
import { IDropdownState } from "../../../../store";
import ICardCategory from "../../../../interfaces/ICardCategory";
import List from "./List";

interface IDropdownProps {
  dropdown: IDropdownState<ICardCategory>;
}

const Dropdown: React.FC<IDropdownProps> = ({ dropdown }) => {
  const [search, setSearch] = useState("");
  const [showItems, setShowItems] = useState<ICardCategory[]>([]);
  const [dropdownWidth, setDropdownWidth] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dropdownRef.current) {
      setDropdownWidth(dropdownRef.current.offsetWidth);
    }
  }, [dropdownRef.current?.offsetWidth]);

  useEffect(() => {
    setSearch('');
  }, [dropdown.isOpen])

  useEffect(() => {
    const sortedOptions = dropdown.items.sort((a, b) =>
      a.name.toLowerCase().localeCompare(b.name.toLowerCase())
    );

    if (!search) {
      setShowItems(sortedOptions);
      return
    }
    setShowItems(sortedOptions.filter(option =>
      option.name.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 10));
  }, [search, dropdown.items])

  return (
    <div>
      <div 
        ref={dropdownRef}
        className="bg-bg rounded-lg border-2 border-sub-alt hover:cursor-pointer" 
        onClick={() => dropdown.setIsOpen(!dropdown.isOpen)}>
        <button className={`font-bold custom-text-1 text-left p-2 ${dropdown.item.name ? 'text-main' : 'text-sub-alt'}`}>{ dropdown.item.name ? dropdown.item.name : "Select category" }</button>
      </div>
      {dropdown.isOpen && (
        <div className="absolute z-20 mt-4 bg-sub-alt border-2 border-sub rounded-lg" style={{ width: dropdownWidth }}>
          <input
            type="text"
            placeholder="find category"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-4 custom-text-1 text-text bg-bg border-b-2 border-sub placeholder-sub font-bold rounded-t-xl focus:outline-none focus:border-round-xl"
          />
          <List dropdown={dropdown} searchTerm={search} items={showItems}/>
        </div>
      )}
    </div>
  );
};

export default Dropdown;