import { useSearchBar } from "./store";

export default () => {
  const searchBar = useSearchBar();
  const lastOptions = searchBar.categories[Math.max(0, searchBar.categories.length-1)];
  const firstOption = searchBar.categories[0];
  const handleCategoryClick = (option: string) => {
      searchBar.setCategory(option);
      searchBar.setIsOpen(false);
  };

  return (
      <div>
          { searchBar.categories.length > 0 
          ? searchBar.categories.map(p => (
            <div
              key={p}
              onClick={() => handleCategoryClick(p)}
              className={`flex justify-between items-center bg-bg px-4 py-4 custom-text-1 text-text hover:bg-sub-alt cursor-pointer ${p === lastOptions ? 'rounded-b-xl' : p === firstOption ? 'rounded-t-xl' : ''}`}
              >
              <p>{p}</p>
              </div>
          )) 
          :
          (
            <div></div>
          )}
      </div>
  );
};