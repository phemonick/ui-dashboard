import { IconType } from 'react-icons';

import * as BiIcons from 'react-icons/bi';


import {ROUTES} from './routes'
import { ReactNode } from 'react';

export interface RouteDefinition {
  path: string;
  label: string;
  icon: IconType;
  exact?: boolean;
}

export const navRoutes: RouteDefinition[] = [
    {
      path: `${ROUTES.DASHBOARD}${ROUTES.DASHBOARD_SUB.SCHEDULE}`,
      label: 'Schedule',
      icon: BiIcons.BiCalendar,
      exact: true,
    },
    {
      path: '/analytics',
      label: 'Analytics',
      icon: BiIcons.BiChart,
      exact: true,
    },
    {
      path: '/stories',
      label: 'Stories',
      icon: BiIcons.BiBook,
      exact: true,
    },
    {
      path: '/engagement-units',
      label: 'Engagement Units',
      icon: BiIcons.BiGroup,
      exact: true,
    },
    {
      path: '/ads',
      label: 'Ads',
      icon: BiIcons.BiGroup,
      exact: true,
    },
    {
      path: '/cms-users',
      label: 'CMS Users',
      icon: BiIcons.BiUser,
      exact: true,
    },
    {
      path: '/roles',
      label: 'Roles',
      icon: BiIcons.BiShield,
      exact: true,
    },
    {
      path: '/apps',
      label: 'Apps',
      icon: BiIcons.BiCodeAlt,
      exact: true,
    },
    {
      path: '/user-guide',
      label: 'User guide',
      icon: BiIcons.BiInfoCircle,
      exact: true,
    },
  ];

  