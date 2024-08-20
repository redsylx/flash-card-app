import { Delete } from "@mui/icons-material";
import { IconContainer } from "./CustomIcon";
import React, { useEffect, useState } from "react";

interface DropdownButtonProps {
    onClick: () => void;
    selectedOption: string;
}
  
const DropdownButton: React.FC<DropdownButtonProps> = ({ onClick, selectedOption }) => {
    return (
        <div className="p-4 bg-sub-alt rounded-xl border-2 border-sub custom-button hover:cursor-pointer w-[300px]" onClick={onClick}>
        <button className="custom-text-1 text-left">{selectedOption}</button>
        </div>
    );
};
  
interface DropdownSearchProps {
    placeholder: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
  
const DropdownSearch: React.FC<DropdownSearchProps> = ({ placeholder, onSearchChange }) => {
    return (
        <input
        type="text"
        placeholder={placeholder}
        onChange={onSearchChange}
        className="w-full px-4 py-4 custom-text-1 text-text bg-bg border-b-2 border-sub placeholder-sub font-bold rounded-t-xl focus:outline-none focus:border-round-xl"
        />
    );
};
  
interface DropdownOptionsProps {
    keyword: string;
    options: Option[];
    onOptionClick: (option: Option) => void;
    onEmptyClick: (option: string) => void;
}
  
const DropdownOptions: React.FC<DropdownOptionsProps> = ({ keyword, options, onOptionClick, onEmptyClick }) => {
    const lastOptions = options[Math.max(0, options.length-1)];

    return (
        <div>
        {options.length > 0 ? options.map((option) => (
            <div
            key={option.id}
            onClick={() => onOptionClick(option)}
            className={`flex justify-between items-center bg-bg px-4 py-4 custom-text-1 text-text hover:bg-sub-alt cursor-pointer ${option === lastOptions ? 'rounded-b-xl' : ''}`}
            >
            <p>{option.name}</p>
            <div className="flex justify-end items-center">
                <p className="me-2">{option.nCard} item</p>
                <div onClick={(e) => {
                e.stopPropagation();
                alert(`DELETE ${option.name}`);
                }}>
                <IconContainer>
                    <Delete/>
                </IconContainer>
                </div>
            </div>
            </div>
        ))
        : 
            <div
            key="create"
            onClick={() => onEmptyClick(keyword)}
            className="bg-bg px-4 py-4 custom-text-1 text-text hover:bg-sub-alt cursor-pointer rounded-b-xl"
            >
            <p>
                Add <span className="font-bold text-main">{keyword}</span>
            </p>
            </div>
        }
        </div>
    );
};
  
type Option = {
    id: number;
    name: string;
    nCard: number;
};
  
type CreateCardCategory = (newCategoryName: string) => Promise<void>;

type DropdownProps = {
    optionsProp: Option[] | null;
    onEmptyClick: CreateCardCategory | null;
};
  
const Dropdown : React.FC<DropdownProps> = ({ optionsProp, onEmptyClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({id: 1, name: 'default', nCard: 0});
    const [searchTerm, setSearchTerm] = useState('');
    const [options, setOptions] = useState<Option[]>([]);
    const [optionsToShow, setOptionsToShow] = useState<Option[]>([])

    useEffect(() => {
        setOptions(optionsProp ?? []);
    }, [optionsProp])

    useEffect(() => {
        setSearchTerm('');
    }, [isOpen])

    useEffect(() => {
        if(!searchTerm) {
            setOptionsToShow(options);
            return
        } 
        setOptionsToShow(options.filter(option =>
            option.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).sort((a, b) => {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        }).slice(0, 10));
    }, [searchTerm, options])

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    const handleEmptyClick = async () => {
        if(onEmptyClick) await onEmptyClick(searchTerm)
    }

    return (
        <div className="flex items-center">
        <div className="me-4">
            <DropdownButton onClick={toggleDropdown} selectedOption={selectedOption.name} />
            {isOpen && (
            <div className="absolute z-10 mt-4 bg-sub-alt border-2 border-sub rounded-xl min-w-[300px]">
                <DropdownSearch placeholder="find or create category" onSearchChange={(e) => setSearchTerm(e.target.value)}/>
                <DropdownOptions options={optionsToShow} onOptionClick={handleOptionClick} keyword={searchTerm} onEmptyClick={handleEmptyClick}/>
            </div>
            )}
        </div>
        <p className="">{selectedOption.nCard > 0 ? selectedOption.nCard + ' items' : ''}</p>
        </div>
    );
};

export default Dropdown;

export type {
    Option
}