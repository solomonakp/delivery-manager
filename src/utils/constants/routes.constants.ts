import { FC } from 'react';

// components
import DeliveryDetailsPage from 'pages/DeliveryDetailsPage';
import DeliveryListPage from 'pages/DeliveryListPage';
import NotFoundPage from 'pages/NotFoundPage';

interface Routes {
  path: string;
  Component: FC;
}

export const routes: Routes[] = [
  {
    path: '/',
    Component: DeliveryListPage,
  },
  {
    path: '/:id',
    Component: DeliveryDetailsPage,
  },
  {
    path: '*',
    Component: NotFoundPage,
  },
];
