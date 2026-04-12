import type { FC } from 'react';
import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { createDinosaurProvider } from './domain/dinosaur/DinosaurProvider';
import * as dinosaurAdapter from './domain/dinosaur/dinosaurAdapter';

type Props = {
    createRouter?(
        routes: RouteObject[],
    ): ReturnType<typeof createBrowserRouter>;
};

const { defaultValue, Provider: DinosaurProvider } =
    createDinosaurProvider(dinosaurAdapter);

export const App: FC<Props> = ({ createRouter = createBrowserRouter }) => {
    return (
        <DinosaurProvider value={defaultValue}>
            <RouterProvider router={createRouter(routes)} />
        </DinosaurProvider>
    );
};
