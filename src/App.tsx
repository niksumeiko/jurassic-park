import type { FC } from 'react';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';

type Props = {
    createRouter?(
        routes: RouteObject[],
    ): ReturnType<typeof createBrowserRouter>;
};

export const App: FC<Props> = ({ createRouter = createBrowserRouter }) => {
    return <RouterProvider router={createRouter(routes)} />;
};
