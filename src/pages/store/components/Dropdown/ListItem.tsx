import ICardCategory from '../../../../interfaces/ICardCategory';
import { IDropdownState } from '../../../../store';

interface IListItemProps<T> {
  item: T;
  isLast: boolean;
  dropdown: IDropdownState<T>;
}

const ListItem: React.FC<IListItemProps<ICardCategory>> = ({ item, isLast, dropdown }) => {
  const selected = item.id === dropdown.item.id;

  return (
    <div
      key={item.id}
      onClick={() => { dropdown.setItem(item); dropdown.setIsOpen(false)}}
      className={`flex justify-between items-center ${selected ? 'bg-sub-alt' : 'bg-bg'} px-4 py-4 custom-text-1 text-text hover:bg-sub-alt cursor-pointer ${isLast ? 'rounded-b-xl' : ''}`}
    >
      <p>{item.name}</p>
      <div className="flex justify-end items-center">
        <p className="me-4">{item.nCard} item</p>
      </div>
    </div>
  );
};

export default ListItem;