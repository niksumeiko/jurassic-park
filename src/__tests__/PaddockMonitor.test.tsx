import { expect, test } from '@playwright/experimental-ct-react';
import { App } from '../App';

function hoursAgo(hours: number): string {
    return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

test('secured large carnivore with normal vitals shows low alert', async ({
    mount,
    page,
}) => {
    await page.route('**/dinosaurs/1', (route) =>
        route.fulfill({
            json: {
                id: '1',
                name: 'Rexy',
                species: 'tyrannosaurus',
                diet: 'carnivore',
                paddock: 'A-1',
                heartRate: 100,
                dangerRating: 1,
                containmentStatus: 'secured',
                lastFedAt: hoursAgo(0.5),
            },
        }),
    );

    const component = await mount(<App />);

    await expect(component.getByText('Rexy')).toBeVisible();
    await expect(
        component.getByText('tyrannosaurus · carnivore · Paddock A-1'),
    ).toBeVisible();
    await expect(component.getByText('Secured')).toBeVisible();
    await expect(component.getByText('100 bpm')).toBeVisible();
    await expect(component.getByText('(Normal)')).toBeVisible();
    await expect(
        component.getByText('Less than an hour ago'),
    ).toBeVisible();
    await expect(component.getByText('— Normal')).toBeVisible();
    await expect(component.getByText('1 / 5')).toBeVisible();
    await expect(component.getByText('Low')).toBeVisible();
    await expect(
        component.getByText(/ALERT LEVEL: MAXIMUM/),
    ).not.toBeVisible();
});

test('breach with elevated heart rate triggers maximum alert', async ({
    mount,
    page,
}) => {
    await page.route('**/dinosaurs/1', (route) =>
        route.fulfill({
            json: {
                id: '1',
                name: 'Blue',
                species: 'velociraptor',
                diet: 'carnivore',
                paddock: 'B-12',
                heartRate: 155,
                dangerRating: 4,
                containmentStatus: 'breach',
                lastFedAt: hoursAgo(8),
            },
        }),
    );

    const component = await mount(<App />);

    await expect(component.getByText('Blue')).toBeVisible();
    await expect(
        component.getByText('velociraptor · carnivore · Paddock B-12'),
    ).toBeVisible();
    await expect(component.getByText('⚠ BREACH')).toBeVisible();
    await expect(component.getByText('155 bpm')).toBeVisible();
    await expect(component.getByText('(Elevated)')).toBeVisible();
    await expect(component.getByText('8 hours ago')).toBeVisible();
    await expect(component.getByText('— Urgent')).toBeVisible();
    await expect(component.getByText('4 / 5')).toBeVisible();
    await expect(
        component.getByText('Maximum', { exact: true }),
    ).toBeVisible();
    await expect(
        component.getByText(/ALERT LEVEL: MAXIMUM — Evacuate nearby sectors/),
    ).toBeVisible();
});

test('maintenance with critical vitals shows high alert', async ({
    mount,
    page,
}) => {
    await page.route('**/dinosaurs/1', (route) =>
        route.fulfill({
            json: {
                id: '1',
                name: 'Thunderfoot',
                species: 'brachiosaurus',
                diet: 'carnivore',
                paddock: 'C-3',
                heartRate: 170,
                dangerRating: 3,
                containmentStatus: 'maintenance',
                lastFedAt: hoursAgo(15),
            },
        }),
    );

    const component = await mount(<App />);

    await expect(component.getByText('Thunderfoot')).toBeVisible();
    await expect(component.getByText('Under Maintenance')).toBeVisible();
    await expect(component.getByText('170 bpm')).toBeVisible();
    await expect(component.getByText('(Critical)')).toBeVisible();
    await expect(component.getByText('15 hours ago')).toBeVisible();
    await expect(component.getByText('— Critical')).toBeVisible();
    await expect(component.getByText('3 / 5')).toBeVisible();
    await expect(component.getByText('High')).toBeVisible();
    await expect(
        component.getByText(/ALERT LEVEL: MAXIMUM/),
    ).not.toBeVisible();
});

test('offline herbivore with elevated heart rate shows moderate alert', async ({
    mount,
    page,
}) => {
    await page.route('**/dinosaurs/1', (route) =>
        route.fulfill({
            json: {
                id: '1',
                name: 'Cera',
                species: 'brachiosaurus',
                diet: 'herbivore',
                paddock: 'D-7',
                heartRate: 130,
                dangerRating: 2,
                containmentStatus: 'offline',
                lastFedAt: hoursAgo(18),
            },
        }),
    );

    const component = await mount(<App />);

    await expect(component.getByText('Cera')).toBeVisible();
    await expect(component.getByText('Sensors Offline')).toBeVisible();
    await expect(component.getByText('130 bpm')).toBeVisible();
    await expect(component.getByText('(Elevated)')).toBeVisible();
    await expect(component.getByText('18 hours ago')).toBeVisible();
    await expect(component.getByText('— Urgent')).toBeVisible();
    await expect(component.getByText('2 / 5')).toBeVisible();
    await expect(component.getByText('Moderate')).toBeVisible();
    await expect(
        component.getByText(/ALERT LEVEL: MAXIMUM/),
    ).not.toBeVisible();
});

test('critical heart rate and high danger trigger maximum alert without breach', async ({
    mount,
    page,
}) => {
    await page.route('**/dinosaurs/1', (route) =>
        route.fulfill({
            json: {
                id: '1',
                name: 'Spitter',
                species: 'dilophosaurus',
                diet: 'herbivore',
                paddock: 'E-2',
                heartRate: 210,
                dangerRating: 5,
                containmentStatus: 'secured',
                lastFedAt: hoursAgo(48),
            },
        }),
    );

    const component = await mount(<App />);

    await expect(component.getByText('Spitter')).toBeVisible();
    await expect(component.getByText('Secured')).toBeVisible();
    await expect(component.getByText('210 bpm')).toBeVisible();
    await expect(component.getByText('(Critical)')).toBeVisible();
    await expect(component.getByText('2 days ago')).toBeVisible();
    await expect(component.getByText('— Critical')).toBeVisible();
    await expect(component.getByText('5 / 5')).toBeVisible();
    await expect(
        component.getByText('Maximum', { exact: true }),
    ).toBeVisible();
    await expect(
        component.getByText(/ALERT LEVEL: MAXIMUM — Evacuate nearby sectors/),
    ).toBeVisible();
});
