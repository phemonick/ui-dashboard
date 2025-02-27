import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { RouteDefinition } from '../routes/side-routes';

interface NavigationItemProps extends RouteDefinition {
  onClick?: () => void;
}

const NavItemContainer = styled(Link)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  height: 56px;
  color: ${props => props.isActive ? 'white' : '#a0aec0'};
  text-decoration: none;
  position: relative;
  transition: all 0.2s ease;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: #3182ce;
    opacity: ${props => props.isActive ? 1 : 0};
    transition: opacity 0.2s ease;
  }

  &:hover {
    background-color: ${props => props.isActive ? '#2d3748' : '#2d3748'};
    color: white;
  }

  background-color: ${props => props.isActive ? '#2d3748' : 'transparent'};
`;

const NavIcon = styled.div`
  margin-right: 12px;
  display: flex;
  font-size: 18px;
`;

const NavLabel = styled.span`
  font-size: 14px;
`;

export const NavigationItem: React.FC<NavigationItemProps> = ({
    path,
    label,
    icon: Icon,
    onClick,
  }) => {
    const location = useLocation();
    const isActive = location.pathname === path;
  
    return (
      <NavItemContainer to={path} isActive={isActive} onClick={onClick}>
        <NavIcon>
            <Icon color="#76A0F0" />
        </NavIcon>
        <NavLabel>{label}</NavLabel>
      </NavItemContainer>
    );
  };
  