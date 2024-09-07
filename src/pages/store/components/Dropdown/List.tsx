import ICardCategory from "../../../../interfaces/ICardCategory";
import { IDropdownState } from "../../../../store";
import ListItem from "./ListItem";

interface IListProps<T> {
    dropdown: IDropdownState<T>;
    items: T[],
    searchTerm: string
}

const List: React.FC<IListProps<ICardCategory>> = ({ dropdown, items, searchTerm }) => {
    const lastOptions = items[Math.max(0, items.length - 1)];

    return (
        <div>
            {items.length > 0 ? items.map((item) => (
                <ListItem
                    key={item.id}
                    item={item}
                    isLast={item === lastOptions}
                    dropdown={dropdown}
                />
            ))
                :
                <div
                    key="create"
                    className="bg-bg px-4 py-4 custom-text-1 text-text hover:bg-sub-alt cursor-pointer rounded-b-xl"
                >
                    <p>
                        <span className="font-bold text-main">{searchTerm}</span> not found
                    </p>
                </div>
            }
        </div>
    );
};

export default List;