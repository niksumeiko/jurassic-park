import type { RouteObject } from 'react-router-dom';
import { PaddockMonitor } from './components/PaddockMonitor/PaddockMonitor';

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <PaddockMonitor />,
    },
];
