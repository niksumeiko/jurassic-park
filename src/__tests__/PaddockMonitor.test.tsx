import { expect, test } from '@playwright/experimental-ct-react';
import { App } from '../App';

function hoursAgo(hours: number): string {
    return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

type DinosaurFixture = {
    id: string;
    name: string;
    species: 'velociraptor' | 'tyrannosaurus' | 'triceratops' | 'brachiosaurus' | 'dilophosaurus';
    diet: 'carnivore' | 'herbivore';
    paddock: string;
    heartRate: number;
    dangerRating: number;
    containmentStatus: 'secured' | 'breach' | 'maintenance' | 'offline';
    lastFedAt: string;
};

function dinosaur(overrides: Partial<DinosaurFixture> = {}): DinosaurFixture {
    return {
        id: '1',
        name: 'Rex',
        species: 'triceratops',
        diet: 'herbivore',
        paddock: 'A-1',
        heartRate: 100,
        dangerRating: 1,
        containmentStatus: 'secured',
        lastFedAt: hoursAgo(0.5),
        ...overrides,
    };
}

async function mountWithDinosaur(
    page: { route: Function },
    mount: Function,
    overrides: Partial<DinosaurFixture> = {},
) {
    await page.route('**/dinosaurs/1', (route: { fulfill: Function }) =>
        route.fulfill({ json: dinosaur(overrides) }),
    );
    return mount(<App />);
}

test('secured dinosaur with normal vitals shows low alert', async ({ mount, page }) => {
    const component = await mountWithDinosaur(page, mount);

    await expect(component.getByText('Secured')).toBeVisible();
    await expect(component.getByText('(Normal)')).toBeVisible();
    await expect(component.getByText('Low')).toBeVisible();
    await expect(component.getByText(/ALERT LEVEL: MAXIMUM/)).not.toBeVisible();
});

test('breach triggers maximum alert', async ({ mount, page }) => {
    const component = await mountWithDinosaur(page, mount, {
        containmentStatus: 'breach',
    });

    await expect(component.getByText('⚠ BREACH')).toBeVisible();
    await expect(component.getByText('Maximum', { exact: true })).toBeVisible();
    await expect(
        component.getByText(/ALERT LEVEL: MAXIMUM — Evacuate nearby sectors/),
    ).toBeVisible();
});

test('maintenance with critical heart rate shows high alert', async ({ mount, page }) => {
    const component = await mountWithDinosaur(page, mount, {
        containmentStatus: 'maintenance',
        heartRate: 210,
        dangerRating: 3,
    });

    await expect(component.getByText('Under Maintenance')).toBeVisible();
    await expect(component.getByText('(Critical)')).toBeVisible();
    await expect(component.getByText('High')).toBeVisible();
    await expect(component.getByText(/ALERT LEVEL: MAXIMUM/)).not.toBeVisible();
});

test('offline sensors shows moderate alert', async ({ mount, page }) => {
    const component = await mountWithDinosaur(page, mount, {
        containmentStatus: 'offline',
        heartRate: 160,
        dangerRating: 2,
    });

    await expect(component.getByText('Sensors Offline')).toBeVisible();
    await expect(component.getByText('Moderate')).toBeVisible();
    await expect(component.getByText(/ALERT LEVEL: MAXIMUM/)).not.toBeVisible();
});

test('critical heart rate with high danger triggers maximum alert without breach', async ({
    mount,
    page,
}) => {
    const component = await mountWithDinosaur(page, mount, {
        heartRate: 210,
        dangerRating: 4,
    });

    await expect(component.getByText('Secured')).toBeVisible();
    await expect(component.getByText('(Critical)')).toBeVisible();
    await expect(
        component.getByText('Maximum', { exact: true }),
    ).toBeVisible();
    await expect(
        component.getByText(/ALERT LEVEL: MAXIMUM — Evacuate nearby sectors/),
    ).toBeVisible();
});
