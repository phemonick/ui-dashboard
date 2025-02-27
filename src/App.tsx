import React from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { IntlProvider } from 'react-intl';
import { getMessages } from './utils/messages';
import { GlobalStyle } from './styles/GlobalStyles';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { DashBoardLayout } from './layouts/dashboard-layout';
import { navRoutes } from './routes/side-routes';
import { Stories } from './screens/Stories';

const SchedulePage = () => <div className="p-4">Schedule Page</div>;
const AnalyticsPage = () => <div className="p-4">Analytics Page</div>;
const EngagementUnitsPage = () => <div className="p-4">Engagement Units Page</div>;
const AdsPage = () => <div className="p-4">Ads Page</div>;
const CmsUsersPage = () => <div className="p-4">CMS Users Page</div>;
const RolesPage = () => <div className="p-4">Roles Page</div>;
const AppsPage = () => <div className="p-4">Apps Page</div>;
const UserGuidePage = () => <div className="p-4">User Guide Page</div>;

const routeComponents: Record<string, React.ComponentType> = {
  '/schedule': SchedulePage,
  '/analytics': AnalyticsPage,
  '/stories': Stories,
  '/engagement-units': EngagementUnitsPage,
  '/ads': AdsPage,
  '/cms-users': CmsUsersPage,
  '/roles': RolesPage,
  '/apps': AppsPage,
  '/user-guide': UserGuidePage,
};

function App() {
  return (
    <ThemeProvider theme={theme}> 
      <IntlProvider locale="en-GB" messages={getMessages("en-GB")}>
        <GlobalStyle />
        <Router>
          <DashBoardLayout>
            <Routes>
              {navRoutes.map(({ path }) => {
                const Component = routeComponents[path];
                return <Route key={path} path={path} element={<Component />} />;
              })}
              <Route path="/" element={<Navigate to="/stories" replace />} />
              <Route path="*" element={<Navigate to="/stories" replace />} />
            </Routes>
          </DashBoardLayout>
        </Router>
      </IntlProvider>
    </ThemeProvider>
  )
}

export default App;
