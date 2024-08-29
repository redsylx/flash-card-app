import React, { useState } from 'react';
import ICardCategory from '../../../../interfaces/ICardCategory';
import { DropdownState } from '../../../home/components/Dropdown/store';

interface ListItemProps {
  cardCategory: ICardCategory;
  isLast: boolean;
  dropdown: DropdownState;
}

const ListItem: React.FC<ListItemProps> = ({ cardCategory, isLast, dropdown }) => {
  const [ selected, setSelected ] = useState(dropdown.selectedCardCategories.find(p => p.name === cardCategory.name) ? true : false);

  const handleCategoryClick = async () => {
    if (dropdown.selectedCardCategories.find(p => p.name === cardCategory.name)) {
      setSelected(false);
      dropdown.setSelectedCardCategories([...dropdown.selectedCardCategories.filter(p => p.name != cardCategory.name)]);
    } else {
      if(dropdown.selectedCardCategories.length == 3) return;
      setSelected(true)
      dropdown.setSelectedCardCategories([...dropdown.selectedCardCategories, cardCategory]);
    }
  };

  return (
    <div
      key={cardCategory.id}
      onClick={() => handleCategoryClick()}
      className={`flex justify-between items-center ${selected ? 'bg-sub-alt' : 'bg-bg'} px-4 py-4 custom-text-1 text-text hover:bg-sub-alt cursor-pointer ${isLast ? 'rounded-b-xl' : ''}`}
    >
      <p>{cardCategory.name}</p>
      <div className="flex justify-end items-center">
        <p className="me-4">{cardCategory.nCard} item</p>
      </div>
    </div>
  );
};

export default ListItem;