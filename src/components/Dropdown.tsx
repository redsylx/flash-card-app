import { Close, Edit } from "@mui/icons-material";
import { IconContainer } from "./CustomIcon";
import React, { ChangeEvent, useEffect, useState } from "react";
import { CustomPopup } from "./PopUp";

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

interface EditOptionProps {
    setPopup: (value: boolean) => void;
    option: Option | undefined;
}

const EditOption : React.FC<EditOptionProps>= ({ setPopup, option }) => {
    const [val, setVal] = useState(option?.name ?? "")
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setVal(event.target.value);
    }
    return(
        <div className="flex flex-col justify-between h-80">
            <div>
                <div className="flex">
                    <p className="custom-text-3 font-bold text-text mb-4">Update category name</p>
                    <div>
                        <IconContainer>
                            <Close/>
                        </IconContainer>
                    </div>
                </div>
                <input
                type="text"
                placeholder={option?.name ?? ""}
                value={val}
                onChange={handleInputChange}
                className="w-full custom-text-1 text-sub bg-bg border-b-2 border-sub placeholder-sub-alt font-bold focus:outline-none focus:border-round-xl"
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <button onClick={() => setPopup(false)} className="font-bold bg-bg border-2 border-sub-alt text-sub hover:bg-error-1 hover:border-error-1 hover:text-bg py-2 rounded-lg">Delete</button>
                <button onClick={() => setPopup(false)} className="custom-button py-2 rounded-lg">Update</button>
            </div>
        </div>
    )
}
  
const DropdownOptions: React.FC<DropdownOptionsProps> = ({ keyword, options, onOptionClick, onEmptyClick }) => {
    const lastOptions = options[Math.max(0, options.length-1)];
    const [selectedOption, setSelectedOption] = useState<Option>();
    const [popUp, setPopUp] = useState(false);

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
                <p className="me-4">{option.nCard} item</p>
                <div onClick={(e) => {
                    e.stopPropagation();
                    setSelectedOption(option);
                    setPopUp(true)
                }}>
                <Edit fontSize="small" className="text-text cursor-pointer mt-1 hover:text-main"/>
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
        <CustomPopup isOpen={popUp} children={<EditOption setPopup={setPopUp} option={selectedOption}/>}/>
        </div>
    );
};
  
type Option = {
    id: string;
    name: string;
    nCard: number;
};
  
type CreateCardCategory = (newCategoryName: string) => Promise<void>;
type OptionChange = (categoryId: string) => Promise<void>;

type DropdownProps = {
    optionsProp: Option[] | null;
    onEmptyClick: CreateCardCategory | null;
    onOptionChange?: OptionChange;
};
  
const Dropdown : React.FC<DropdownProps> = ({ optionsProp, onEmptyClick, onOptionChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({id: "1", name: 'default', nCard: 0});
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

    const handleOptionClick = async (option: Option) => {
        setSelectedOption(option);
        setIsOpen(false);
        if(onOptionChange) {
            await onOptionChange(option.id);
        }
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