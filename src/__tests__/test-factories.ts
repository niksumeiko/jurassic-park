import type { Dinosaur } from '../types/dinosaur';

export function hoursAgo(hours: number): string {
    return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

export function createTestDinosaur(
    overrides: Partial<Dinosaur> = {},
): Dinosaur {
    return {
        id: '1',
        name: 'Test Dinosaur',
        species: 'tyrannosaurus',
        diet: 'carnivore',
        paddock: 'A-1',
        heartRate: 100,
        dangerRating: 1,
        containmentStatus: 'secured',
        lastFedAt: hoursAgo(0.5),
        ...overrides,
    };
}
