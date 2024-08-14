import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Header from "../components/Header";

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
  options: string[];
  onOptionClick: (option: string) => void;
}

const DropdownOptions: React.FC<DropdownOptionsProps> = ({ options, onOptionClick }) => {
  const lastOptions = options?.length > 0 ? options[Math.max(0, options.length-1)] : null;
  return (
    <div>
      {options.map((option) => (
        <div
          key={option}
          onClick={() => onOptionClick(option)}
          className={`bg-bg px-4 py-4 custom-text-1 text-text hover:bg-sub-alt cursor-pointer ${option == lastOptions ? 'rounded-b-xl' : ''}`}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');
  const options = ['default', 'meme', 'english', 'korea', 'tech', 'study', 'politic', 'finance'];

  let filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    setSearchTerm('');
  }, [isOpen])

  let optionsToShow = filteredOptions.slice(0, 3);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div>
      <DropdownButton onClick={toggleDropdown} selectedOption={selectedOption} />
      {isOpen && (
        <div className="absolute z-2 mt-4 bg-sub-alt border-2 border-sub rounded-xl min-w-[300px]">
          <DropdownSearch placeholder="find or create category" onSearchChange={(e) => setSearchTerm(e.target.value)}/>
          <DropdownOptions options={optionsToShow} onOptionClick={handleOptionClick} />
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
  }, [getAccessTokenSilently]);

  if (isLoading) {
    return <div className="custom-page pt-4">Loading ...</div>;
  }

  return (
    isAuthenticated && user && (
      <div>
        <Header/>
        <div className="custom-page">
          <div className="mt-4 mb-8">
            <Dropdown/>
          </div>
          <hr className="border-t-2 border-sub"/>
        </div>
      </div>
    )
  );
};

export default Home;