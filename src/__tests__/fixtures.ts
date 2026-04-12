import { test as base } from '@playwright/experimental-ct-react';
import type { Dinosaur } from '../types/dinosaur';

type MockApi = {
    dinosaur: (id: string, data: Dinosaur) => Promise<void>;
    dinosaurError: (id: string, status?: number) => Promise<void>;
};

type Fixtures = {
    mockApi: MockApi;
};

export const test = base.extend<Fixtures>({
    mockApi: async ({ page }, use) => {
        const api: MockApi = {
            dinosaur: async (id, data) => {
                await page.route(`**/dinosaurs/${id}`, (route) =>
                    route.fulfill({ json: data }),
                );
            },
            dinosaurError: async (id, status = 500) => {
                await page.route(`**/dinosaurs/${id}`, (route) =>
                    route.fulfill({ status }),
                );
            },
        };
        await use(api);
    },
});

export { expect } from '@playwright/experimental-ct-react';
