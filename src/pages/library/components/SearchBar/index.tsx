import { useState, useEffect } from "react";
import List from "./List";
import { useSearchBar } from "./store";
import { useCardTableStateLibrary } from "../../../../store";

export default () => {
  const searchBar = useSearchBar();
  const table = useCardTableStateLibrary();
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    searchBar.setKeyword(debouncedValue);
    table.setRefresh(!table.refresh);
  }, [debouncedValue]);

  return (
    <div className="flex items-center">
      <div className="me-4 flex">
        <div
          className="p-4 bg-sub-alt rounded-s-xl border-2 border-sub custom-button hover:cursor-pointer w-[100px]"
          onClick={() => searchBar.setIsOpen(!searchBar.isOpen)}
        >
          <button className="custom-text-1 text-left">
            {searchBar.category ? searchBar.category : searchBar.categories[0]}
          </button>
        </div>
        <input
          type="text"
          placeholder="Search something"
          className="custom-input-right ps-4 border-y-2 border-e-2 border-sub"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div></div>
        {searchBar.isOpen && (
          <div className="absolute z-20 mt-4 bg-sub-alt border-2 border-sub rounded-xl min-w-[100px]">
            <List />
          </div>
        )}
      </div>
    </div>
  );
};
