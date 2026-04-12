import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import { fetchDinosaur } from './dinosaurAdapter';
import { Dinosaur } from './dinosaurService';

function dinosaur(overrides: Partial<Dinosaur> = {}): Dinosaur {
    return {
        id: '1',
        name: 'Rex',
        species: 'tyrannosaurus',
        diet: 'carnivore',
        paddock: 'A-1',
        heartRate: 100,
        dangerRating: 1,
        containmentStatus: 'secured',
        lastFedAt: new Date().toISOString(),
        ...overrides,
    };
}

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('fetchDinosaur', () => {
    it('returns the dinosaur on a successful response', async () => {
        const expected = dinosaur();
        server.use(
            http.get('http://localhost:3000/dinosaurs/1', () =>
                HttpResponse.json(expected),
            ),
        );

        const result = await fetchDinosaur();

        expect(result).toEqual(expected);
    });

    it('throws when the server responds with an error', async () => {
        server.use(
            http.get('http://localhost:3000/dinosaurs/1', () =>
                HttpResponse.json(
                    { message: 'Dinosaur not found' },
                    { status: 404 },
                ),
            ),
        );

        await expect(fetchDinosaur()).rejects.toThrow('Dinosaur not found');
    });

    it('throws when the network request fails', async () => {
        server.use(
            http.get('http://localhost:3000/dinosaurs/1', () =>
                HttpResponse.error(),
            ),
        );

        await expect(fetchDinosaur()).rejects.toThrow();
    });
});
