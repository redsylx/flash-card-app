import { useEffect, useState } from "react";
import List from "./List";
import { DropdownState } from "../../home/components/Dropdown/store";

interface IDropdownProps {
    dropdown: DropdownState;
}

const Dropdown : React.FC<IDropdownProps> = ({ dropdown }) => {
    const [text, setText] = useState("");

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

    useEffect(() => {
        if(dropdown.selectedCardCategories.length == 0) {
            setText("select categories (max 3)");
            return
        }

        setText(dropdown.selectedCardCategories.map(p => p.name).join(", "));
    }, [dropdown.selectedCardCategories]);

    return (
        <div className="flex items-center">
            <div className="me-4">
                <div className="p-4 bg-sub-alt rounded-xl border-2 border-sub custom-button-alt hover:cursor-pointer w-[300px]" onClick={() => dropdown.setIsOpen(!dropdown.isOpen)}>
                    { dropdown.selectedCardCategories.length == 0 ? (<button className="custom-text-1 text-left text-sub">{text}</button>) : (<button className="custom-text-1 text-left">{text}</button>)}
                </div>
                {dropdown.isOpen && (
                    <div className="absolute z-20 mt-4 bg-sub-alt border-2 border-sub rounded-xl min-w-[300px]">
                        <input
                            type="text"
                            placeholder="find category"
                            onChange={(e) => dropdown.setSearchTerm(e.target.value)}
                            className="w-full px-4 py-4 custom-text-1 text-text bg-bg border-b-2 border-sub placeholder-sub font-bold rounded-t-xl focus:outline-none focus:border-round-xl"
                        />
                        <List dropdown={dropdown}/>
                    </div>
                )}
            </div>
            <p className="">{dropdown.selectedCardCategories.length > 0 ? dropdown.selectedCardCategories.reduce((acc, item) => acc + item.nCard, 0) + ' items' : ''}</p>
        </div>
    );
};

export default Dropdown;