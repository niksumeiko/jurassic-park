import { describe, it, expect } from 'vitest';
import { determineFeedingUrgency } from './dinosaur-calculations';

describe('determineFeedingUrgency', () => {
    describe('carnivore diet', () => {
        it('should return Critical when fed more than 12 hours ago', () => {
            expect(
                determineFeedingUrgency({
                    diet: 'carnivore',
                    hoursSinceFeeding: 13,
                }),
            ).toBe('Critical');
        });

        it('should return Urgent when fed between 6-12 hours ago', () => {
            expect(
                determineFeedingUrgency({
                    diet: 'carnivore',
                    hoursSinceFeeding: 8,
                }),
            ).toBe('Urgent');
            expect(
                determineFeedingUrgency({
                    diet: 'carnivore',
                    hoursSinceFeeding: 12,
                }),
            ).toBe('Urgent');
        });

        it('should return Normal when fed less than 6 hours ago', () => {
            expect(
                determineFeedingUrgency({
                    diet: 'carnivore',
                    hoursSinceFeeding: 5,
                }),
            ).toBe('Normal');
        });
    });

    describe('herbivore diet', () => {
        it('should return Critical when fed more than 24 hours ago', () => {
            expect(
                determineFeedingUrgency({
                    diet: 'herbivore',
                    hoursSinceFeeding: 25,
                }),
            ).toBe('Critical');
        });

        it('should return Urgent when fed between 12-24 hours ago', () => {
            expect(
                determineFeedingUrgency({
                    diet: 'herbivore',
                    hoursSinceFeeding: 15,
                }),
            ).toBe('Urgent');
            expect(
                determineFeedingUrgency({
                    diet: 'herbivore',
                    hoursSinceFeeding: 24,
                }),
            ).toBe('Urgent');
        });

        it('should return Normal when fed less than 12 hours ago', () => {
            expect(
                determineFeedingUrgency({
                    diet: 'herbivore',
                    hoursSinceFeeding: 10,
                }),
            ).toBe('Normal');
        });
    });
});
