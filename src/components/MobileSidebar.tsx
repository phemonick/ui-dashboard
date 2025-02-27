import React, { useEffect } from 'react';
import styled from 'styled-components';
import { NavigationItem } from './NavigationItem';
import { BiX } from 'react-icons/bi';
import { useSidebar } from '../context/SideNavContext';
import { navRoutes } from '../routes/side-routes';

interface MobileSidebarProps {
  isOpen: boolean;
}

const Overlay = styled.div<MobileSidebarProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 40;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`;

const SidebarContainer = styled.aside<MobileSidebarProps>`
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background-color: #171A25;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  overflow-y: auto;
  transform: ${props => (props.isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease;
  display: none;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const SidebarHeader = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  border-bottom: 1px solid #2d3748;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.div`
  width: 28px;
  height: 28px;
  background-color: #3182ce;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  margin-right: 8px;
`;

const LogoText = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const NavSection = styled.div`
  border-bottom: 0.1px solid #514f4f;
  padding: 1rem 0;
  margin-top: 1rem;

  &:last-child {
    border-bottom: none;
  }
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #a0aec0;
  font-size: 24px;
  
  &:hover {
    color: white;
    background-color: #2d3748;
  }
`;

const sections = [
    {
      title: 'Content Management',
      routes: navRoutes.slice(0, 5)
    },
    {
      title: 'Marketing',
      routes: navRoutes.slice(5, 8) 
    },
    {
      title: 'System',
      routes: navRoutes.slice(8)
    }
  ];

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
`;

export const MobileSidebar: React.FC = () => {
  const { isMobileSidebarOpen, closeMobileSidebar } = useSidebar();

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileSidebarOpen) {
        closeMobileSidebar();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    
    if (isMobileSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = '';
    };
  }, [isMobileSidebarOpen, closeMobileSidebar]);

  return (
    <>
      <Overlay isOpen={isMobileSidebarOpen} onClick={closeMobileSidebar} />
      <SidebarContainer isOpen={isMobileSidebarOpen}>
        <SidebarHeader>
          <LogoContainer>
            <LogoIcon>S</LogoIcon>
            <LogoText>storyteller</LogoText>
          </LogoContainer>
          <CloseButton onClick={closeMobileSidebar} aria-label="Close sidebar">
            <BiX />
          </CloseButton>
        </SidebarHeader>
        <NavList>
            {sections.map((section, index) => (
            <NavSection key={index}>
                {section.routes.map((route) => (
                <NavigationItem
                    key={route.path}
                    path={route.path}
                    label={route.label}
                    icon={route.icon}
                />
                ))}
            </NavSection>
            ))}
        </NavList>
      </SidebarContainer>
    </>
  );
};