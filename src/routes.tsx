import type { RouteObject } from 'react-router-dom';
import { PaddockMonitor } from './PaddockMonitor';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <PaddockMonitor />,
    },
];
