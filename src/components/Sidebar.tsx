import React from 'react';
import styled from 'styled-components';
import { NavigationItem } from './NavigationItem';
import { navRoutes } from '../routes/side-routes';

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

const SidebarContainer = styled.aside`
  width: 220px;
  height: calc(100vh - 64px);
  background-color: #171A25;
  position: fixed;
  top: 64px;
  left: 0;
  z-index: 20;
  overflow-y: auto;
  border-top: 0.1px solid #514f4f;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavSection = styled.div`
  border-bottom: 0.1px solid #514f4f;
  padding: 1rem 0;
  margin-top: 1rem;

  &:last-child {
    border-bottom: none;
  }
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
`;

export const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
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
  );
};
