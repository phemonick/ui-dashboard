import React from 'react';
import styled from 'styled-components';
import { useSidebar } from '../context/SideNavContext';
import { BiMenu, BiHelpCircle } from "react-icons/bi";



const HeaderContainer = styled.header`
  height: 64px;
  background-color: #171A25;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 30;

  @media (max-width: 768px) {
    height: 56px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.div`
  width: 32px;
  height: 32px;
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
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #4a5568;
  font-size: 20px;
  margin-left: 8px;
  
  &:hover {
    background-color: #f7fafc;
  }
`;

const UserButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3182ce;
  border: none;
  cursor: pointer;
  color: white;
  font-weight: 600;
  margin-left: 16px;
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

export const Header: React.FC = () => {
    const { toggleMobileSidebar } = useSidebar();
  
    return (
      <HeaderContainer>
        <LogoContainer>
          <MobileMenuButton onClick={toggleMobileSidebar}>
            <BiMenu />
          </MobileMenuButton>
          <LogoIcon>S</LogoIcon>
          <LogoText>storyteller</LogoText>
        </LogoContainer>
        <RightContainer>
          <IconButton>
            <BiHelpCircle color='#fff' />
          </IconButton>
          <UserButton>ST</UserButton>
        </RightContainer>
      </HeaderContainer>
    );
  };