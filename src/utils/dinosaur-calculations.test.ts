import { describe, it, expect } from 'vitest';
import {
    determineFeedingUrgency,
    determineLastFedLabel,
} from './dinosaur-calculations';

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

describe('determineLastFedLabel', () => {
    it('should return "Less than an hour ago" for < 1 hour', () => {
        expect(determineLastFedLabel(0.5)).toBe('Less than an hour ago');
    });

    it('should return hours for < 24 hours', () => {
        expect(determineLastFedLabel(8)).toBe('8 hours ago');
        expect(determineLastFedLabel(23)).toBe('23 hours ago');
    });

    it('should return days for >= 24 hours', () => {
        expect(determineLastFedLabel(48)).toBe('2 days ago');
    });
});
