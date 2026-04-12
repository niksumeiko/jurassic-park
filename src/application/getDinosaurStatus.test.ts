import { describe, it, expect } from 'vitest';
import { getDinosaurStatus } from './getDinosaurStatus';
import {
    CONTAINMENT_DISPLAY,
    Dinosaur,
} from '../domain/dinosaur/dinosaurService';

function hoursAgo(hours: number): number {
    return Date.now() - hours * 60 * 60 * 1000;
}

function dinosaur(overrides: Partial<Dinosaur> = {}): Dinosaur {
    return {
        id: '1',
        name: 'Rex',
        species: 'triceratops',
        diet: 'herbivore',
        paddock: 'A-1',
        heartRate: 100,
        dangerRating: 1,
        containmentStatus: 'secured',
        lastFedAt: new Date(hoursAgo(0.5)).toISOString(),
        ...overrides,
    };
}

describe('getDinosaurStatus', () => {
    it('maps raw dinosaur fields verbatim to view model', () => {
        const now = Date.now();
        const dino = dinosaur({
            lastFedAt: new Date(now - 13 * 60 * 60 * 1000).toISOString(),
        });
        const status = getDinosaurStatus(dino, now);

        expect(status.name).toBe(dino.name);
        expect(status.species).toBe(dino.species);
        expect(status.diet).toBe(dino.diet);
        expect(status.paddock).toBe(dino.paddock);
        expect(status.heartRate).toBe(dino.heartRate);
        expect(status.dangerRating).toBe(dino.dangerRating);
    });

    it('derives feedingUrgency from diet and lastFedAt', () => {
        const now = Date.now();
        const dino = dinosaur({
            diet: 'carnivore',
            lastFedAt: new Date(now - 13 * 60 * 60 * 1000).toISOString(),
        });
        const status = getDinosaurStatus(dino, now);

        expect(status.feedingUrgency).toBe('Critical');
    });

    it('derives parkAlertLevel from containment + danger + heartRate combined', () => {
        const dino = dinosaur({
            containmentStatus: 'breach',
            dangerRating: 4,
            heartRate: 200,
        });
        const status = getDinosaurStatus(dino, Date.now());

        expect(status.parkAlertLevel).toBe('Maximum');
    });

    it('maps containmentStatus to display color and label', () => {
        // TODO: assert containmentColor and containmentLabel
        //       match what getContainmentDisplay returns for 'secured'
        const dino = dinosaur();
        const status = getDinosaurStatus(dino, Date.now());
        const { label: containmentLabel, color: contaimentColor } =
            CONTAINMENT_DISPLAY['secured'];
        expect(status.statusLabel).toBe(containmentLabel);
        expect(status.statusColor).toBe(contaimentColor);
    });
});
