import React, { createContext, useContext, useState } from 'react';

interface SideNavContextType {
  isMobileSidebarOpen: boolean;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

const SideNavContext = createContext<SideNavContextType | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <SideNavContext.Provider
      value={{ isMobileSidebarOpen, toggleMobileSidebar, closeMobileSidebar }}
    >
      {children}
    </SideNavContext.Provider>
  );
};


export const useSidebar = (): SideNavContextType => {
    const context = useContext(SideNavContext);
    if (context === undefined) {
      throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
  };