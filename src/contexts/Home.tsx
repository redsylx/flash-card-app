import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HomeContextType {
    refreshDropdown: boolean;
    setRefreshDropdown: React.Dispatch<React.SetStateAction<boolean>>;
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

  return (
    <HomeContext.Provider value={{ refreshDropdown, setRefreshDropdown }}>
      {children}
    </HomeContext.Provider>
  );
};