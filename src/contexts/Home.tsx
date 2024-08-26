import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ICard } from '../components/ListMemento';

interface HomeContextType {
    refreshDropdown: boolean;
    setRefreshDropdown: React.Dispatch<React.SetStateAction<boolean>>;
    refreshListMemento: boolean;
    setRefreshListMemento: React.Dispatch<React.SetStateAction<boolean>>;
    popUpMemento: boolean;
    setPopUpMemento: React.Dispatch<React.SetStateAction<boolean>>;
    selectedMemento: ICard | undefined;
    setSelectedMemento: React.Dispatch<React.SetStateAction<ICard | undefined>>;
    mementoFormType: "add" | "update";
    setMementoFormType: React.Dispatch<React.SetStateAction<"add" | "update">>;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export const useHome = (): HomeContextType => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error('useHome must be used within a LoadingProvider');
  }
  return context;
};

interface HomeProviderProps {
  children: ReactNode;
}

export const HomeProvider: React.FC<HomeProviderProps> = ({ children }) => {
  const [refreshDropdown, setRefreshDropdown] = useState(false);
  const [refreshListMemento, setRefreshListMemento] = useState(false);
  const [popUpMemento, setPopUpMemento] = useState(false);
  const [selectedMemento, setSelectedMemento] = useState<ICard>();
  const [mementoFormType, setMementoFormType] = useState<"add" | "update">("add");

  return (
    <HomeContext.Provider value={{ refreshDropdown, setRefreshDropdown, refreshListMemento, setRefreshListMemento, popUpMemento, setPopUpMemento, selectedMemento, setSelectedMemento, mementoFormType, setMementoFormType }}>
      {children}
    </HomeContext.Provider>
  );
};