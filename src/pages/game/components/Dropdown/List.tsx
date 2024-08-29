import { DropdownState } from "../../../home/components/Dropdown/store";
import ListItem from "./ListItem";

interface IProps {
    dropdown: DropdownState;
}

const List: React.FC<IProps> = ({ dropdown }) => {
    const lastOptions = dropdown.cardCategoriesToShow[Math.max(0, dropdown.cardCategoriesToShow.length - 1)];

    return (
        <div>
            {dropdown.cardCategoriesToShow.length > 0 ? dropdown.cardCategoriesToShow.map((cardCategory) => (
                <ListItem
                    key={cardCategory.id}
                    cardCategory={cardCategory}
                    isLast={cardCategory === lastOptions}
                    dropdown={dropdown}
                />
            ))
                :
                <div
                    key="create"
                    className="bg-bg px-4 py-4 custom-text-1 text-text hover:bg-sub-alt cursor-pointer rounded-b-xl"
                >
                    <p>
                        <span className="font-bold text-main">{dropdown.searchTerm}</span> not found
                    </p>
                </div>
            }
        </div>
    );
};

export default List;