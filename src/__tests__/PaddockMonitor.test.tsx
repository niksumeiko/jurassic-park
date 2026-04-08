import { expect, test } from '@playwright/experimental-ct-react';
import { App } from '../App';

const DINOSAUR = {
    id: '1',
    name: 'Blue',
    species: 'velociraptor',
    diet: 'carnivore',
    paddock: 'B-12',
    heartRate: 142,
    dangerRating: 4,
    containmentStatus: 'breach',
    lastFedAt: '2025-04-07T08:00:00Z',
};

test('displays dinosaur name when API responds', async ({ mount, page }) => {
    await page.route('**/dinosaurs/1', (route) =>
        route.fulfill({ json: DINOSAUR }),
    );

    const component = await mount(<App />);

    await expect(component.getByText('Blue')).toBeVisible();
});
