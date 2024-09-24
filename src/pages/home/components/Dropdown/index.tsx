import { useEffect } from "react";
import { DropdownState } from "./store";
import List from "./List";

interface IDropdownProps {
    dropdown: DropdownState;
}

const Dropdown : React.FC<IDropdownProps> = ({ dropdown }) => {
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
                <div className="p-4 bg-sub-alt rounded-xl border-2 border-sub custom-button hover:cursor-pointer w-[250px] sm:w-[300px]" onClick={() => dropdown.setIsOpen(!dropdown.isOpen)}>
                    <div className=" flex justify-between">
                        <p className="custom-text-1 text-left">{dropdown.selectedCardCategory.name}</p>
                        <p className="custom-text-1 text-right">{dropdown.selectedCardCategory.nCard} item</p>
                    </div>
                </div>
                {dropdown.isOpen && (
                    <div className="absolute z-20 mt-4 bg-sub-alt border-2 border-sub rounded-xl min-w-[300px]">
                        <input
                            type="text"
                            placeholder="find or create category"
                            onChange={(e) => dropdown.setSearchTerm(e.target.value)}
                            className="w-full px-4 py-4 custom-text-1 text-text bg-bg border-b-2 border-sub placeholder-sub font-bold rounded-t-xl focus:outline-none focus:border-round-xl"
                        />
                        <List dropdown={dropdown}/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dropdown;