import React from 'react';
import styled from 'styled-components';
import { SidebarProvider } from '../../context/SideNavContext';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { MobileSidebar } from '../../components/MobileSidebar';

const DashBoardLayoutContainer = styled.div`
  min-height: 100vh;
  background-color: #171A25;

`;

const PageContent = styled.main`
  margin-left: 220px;
  padding-top: 64px;
  padding-right: 1.7rem;
  min-height: calc(100vh - 30px);
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding-top: 56px;
    padding-right: 0;
  }
`;

interface DashBoardLayoutProps {
  children: React.ReactNode;
}

export const DashBoardLayout: React.FC<DashBoardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <DashBoardLayoutContainer>
        <Header />
        <Sidebar />
        <MobileSidebar />
        <PageContent>{children}</PageContent>
      </DashBoardLayoutContainer>
    </SidebarProvider>
  );
};


