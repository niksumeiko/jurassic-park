import { describe, it, expect } from 'vitest';
import {
    determineFeedingUrgency,
    determineLastFedLabel,
    determineHeartRateStatus,
    determineContainmentStatusDisplay,
    determineParkAlertLevel,
} from './dinosaur-status';

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

describe('determineHeartRateStatus', () => {
    describe('large species (tyrannosaurus, brachiosaurus)', () => {
        it('should return Critical for > 160 bpm', () => {
            expect(
                determineHeartRateStatus({
                    species: 'tyrannosaurus',
                    heartRate: 170,
                }),
            ).toBe('Critical');
        });

        it('should return Elevated for 121-160 bpm', () => {
            expect(
                determineHeartRateStatus({
                    species: 'brachiosaurus',
                    heartRate: 130,
                }),
            ).toBe('Elevated');
        });

        it('should return Normal for <= 120 bpm', () => {
            expect(
                determineHeartRateStatus({
                    species: 'tyrannosaurus',
                    heartRate: 100,
                }),
            ).toBe('Normal');
        });
    });

    describe('small species (velociraptor, triceratops, dilophosaurus)', () => {
        it('should return Critical for > 200 bpm', () => {
            expect(
                determineHeartRateStatus({
                    species: 'velociraptor',
                    heartRate: 210,
                }),
            ).toBe('Critical');
        });

        it('should return Elevated for 151-200 bpm', () => {
            expect(
                determineHeartRateStatus({
                    species: 'dilophosaurus',
                    heartRate: 155,
                }),
            ).toBe('Elevated');
        });

        it('should return Normal for <= 150 bpm', () => {
            expect(
                determineHeartRateStatus({
                    species: 'triceratops',
                    heartRate: 140,
                }),
            ).toBe('Normal');
        });
    });
});

describe('determineContainmentStatusDisplay', () => {
    it('should return secured display', () => {
        expect(determineContainmentStatusDisplay('secured')).toEqual({
            color: 'bg-green-100 text-green-800',
            label: 'Secured',
        });
    });

    it('should return breach display', () => {
        expect(determineContainmentStatusDisplay('breach')).toEqual({
            color: 'bg-red-100 text-red-800',
            label: '⚠ BREACH',
        });
    });

    it('should return maintenance display', () => {
        expect(determineContainmentStatusDisplay('maintenance')).toEqual({
            color: 'bg-yellow-100 text-yellow-800',
            label: 'Under Maintenance',
        });
    });

    it('should return offline display', () => {
        expect(determineContainmentStatusDisplay('offline')).toEqual({
            color: 'bg-gray-300 text-gray-600',
            label: 'Sensors Offline',
        });
    });
});

describe('determineParkAlertLevel', () => {
    it('should return Maximum for containment breach', () => {
        expect(
            determineParkAlertLevel({
                containmentStatus: 'breach',
                dangerRating: 1,
                heartRateStatus: 'Normal',
            }),
        ).toBe('Maximum');
    });

    it('should return Maximum for high danger (>= 4) with critical heart rate', () => {
        expect(
            determineParkAlertLevel({
                containmentStatus: 'secured',
                dangerRating: 5,
                heartRateStatus: 'Critical',
            }),
        ).toBe('Maximum');
    });

    it('should return High for moderate danger (>= 3) with non-normal heart rate', () => {
        expect(
            determineParkAlertLevel({
                containmentStatus: 'maintenance',
                dangerRating: 3,
                heartRateStatus: 'Critical',
            }),
        ).toBe('High');
    });

    it('should return Moderate for danger >= 2', () => {
        expect(
            determineParkAlertLevel({
                containmentStatus: 'offline',
                dangerRating: 2,
                heartRateStatus: 'Elevated',
            }),
        ).toBe('Moderate');
    });

    it('should return Low for low danger with normal vitals', () => {
        expect(
            determineParkAlertLevel({
                containmentStatus: 'secured',
                dangerRating: 1,
                heartRateStatus: 'Normal',
            }),
        ).toBe('Low');
    });
});
