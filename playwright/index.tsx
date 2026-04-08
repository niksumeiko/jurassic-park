/// <reference types="vite/client" />
import '../src/index.css';
import { beforeMount } from '@playwright/experimental-ct-react/hooks';
import { createHashRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import type { createBrowserRouter } from 'react-router-dom';

type CreateRouter = (
    routes: RouteObject[],
) => ReturnType<typeof createBrowserRouter>;

beforeMount(async ({ App }) => {
    const createRouter: CreateRouter = (routes) =>
        createHashRouter(routes) as ReturnType<typeof createBrowserRouter>;

    // @ts-expect-error -- Playwright types App as generic; createRouter is injected at runtime
    return <App createRouter={createRouter} />;
});
