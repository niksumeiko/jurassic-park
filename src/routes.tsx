import type { RouteObject } from 'react-router-dom';
import { PaddockPage } from './PaddockPage';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <PaddockPage />,
    },
];
