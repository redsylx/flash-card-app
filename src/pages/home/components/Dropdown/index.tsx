import { useEffect } from "react";
import useDropdown from "./store";
import List from "./List";

export default () => {
    const dropdown = useDropdown();

    useEffect(() => {
        dropdown.setSearchTerm('');
    }, [dropdown.isOpen])

    useEffect(() => {
        const sortedOptions = dropdown.cardCategories.sort((a, b) =>
            a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );

        if (!dropdown.searchTerm) {
            dropdown.setCardCategoriesToShow(sortedOptions);
            return
        }
        dropdown.setCardCategoriesToShow(sortedOptions.filter(option =>
            option.name.toLowerCase().includes(dropdown.searchTerm.toLowerCase())
        ).slice(0, 10));
    }, [dropdown.searchTerm, dropdown.cardCategories])

    return (
        <div className="flex items-center">
            <div className="me-4">
                <div className="p-4 bg-sub-alt rounded-xl border-2 border-sub custom-button hover:cursor-pointer w-[300px]" onClick={() => dropdown.setIsOpen(!dropdown.isOpen)}>
                    <button className="custom-text-1 text-left">{dropdown.selectedCardCategory.name}</button>
                </div>
                {dropdown.isOpen && (
                    <div className="absolute z-20 mt-4 bg-sub-alt border-2 border-sub rounded-xl min-w-[300px]">
                        <input
                            type="text"
                            placeholder="find or create category"
                            onChange={(e) => dropdown.setSearchTerm(e.target.value)}
                            className="w-full px-4 py-4 custom-text-1 text-text bg-bg border-b-2 border-sub placeholder-sub font-bold rounded-t-xl focus:outline-none focus:border-round-xl"
                        />
                        <List/>
                    </div>
                )}
            </div>
            <p className="">{dropdown.selectedCardCategory.nCard > 0 ? dropdown.selectedCardCategory.nCard + ' items' : ''}</p>
        </div>
    );
};