import { describe, expect, it } from 'vitest';
import { getFeedingUrgency, getLastFedLabel, getHeartRateStatus, getContainmentDisplay, getParkAlertLevel } from './dinosaurService';

describe('getFeedingUrgency', () => {
    describe('carnivore', () => {
        it('returns Normal when fed less than 6 hours ago', () => {
            expect(getFeedingUrgency('carnivore', 5)).toBe('Normal');
        });

        it('returns Urgent when fed more than 6 hours ago', () => {
            expect(getFeedingUrgency('carnivore', 7)).toBe('Urgent');
        });

        it('returns Critical when fed more than 12 hours ago', () => {
            expect(getFeedingUrgency('carnivore', 13)).toBe('Critical');
        });
    });

    describe('herbivore', () => {
        it('returns Normal when fed less than 12 hours ago', () => {
            expect(getFeedingUrgency('herbivore', 11)).toBe('Normal');
        });

        it('returns Urgent when fed more than 12 hours ago', () => {
            expect(getFeedingUrgency('herbivore', 13)).toBe('Urgent');
        });

        it('returns Critical when fed more than 24 hours ago', () => {
            expect(getFeedingUrgency('herbivore', 25)).toBe('Critical');
        });
    });
});

describe('getLastFedLabel', () => {
    it('returns "Less than an hour ago" when under 1 hour', () => {
        expect(getLastFedLabel(0.5)).toBe('Less than an hour ago');
    });

    it('returns hours label when between 1 and 24 hours', () => {
        expect(getLastFedLabel(8)).toBe('8 hours ago');
    });

    it('returns days label when 24 or more hours', () => {
        expect(getLastFedLabel(48)).toBe('2 days ago');
    });
});

describe('getHeartRateStatus', () => {
    describe('large species (tyrannosaurus, brachiosaurus)', () => {
        it('returns Normal when heart rate is 120 or below', () => {
            expect(getHeartRateStatus('tyrannosaurus', 120)).toBe('Normal');
        });

        it('returns Elevated when heart rate exceeds 120', () => {
            expect(getHeartRateStatus('brachiosaurus', 121)).toBe('Elevated');
        });

        it('returns Critical when heart rate exceeds 160', () => {
            expect(getHeartRateStatus('tyrannosaurus', 161)).toBe('Critical');
        });
    });

    describe('other species', () => {
        it('returns Normal when heart rate is 150 or below', () => {
            expect(getHeartRateStatus('velociraptor', 150)).toBe('Normal');
        });

        it('returns Elevated when heart rate exceeds 150', () => {
            expect(getHeartRateStatus('triceratops', 151)).toBe('Elevated');
        });

        it('returns Critical when heart rate exceeds 200', () => {
            expect(getHeartRateStatus('dilophosaurus', 201)).toBe('Critical');
        });
    });
});

describe('getContainmentDisplay', () => {
    it('returns green styling and "Secured" label for secured status', () => {
        expect(getContainmentDisplay('secured')).toEqual({
            color: 'bg-green-100 text-green-800',
            label: 'Secured',
        });
    });

    it('returns red styling and breach label for breach status', () => {
        expect(getContainmentDisplay('breach')).toEqual({
            color: 'bg-red-100 text-red-800',
            label: '⚠ BREACH',
        });
    });

    it('returns yellow styling for maintenance status', () => {
        expect(getContainmentDisplay('maintenance')).toEqual({
            color: 'bg-yellow-100 text-yellow-800',
            label: 'Under Maintenance',
        });
    });

    it('returns gray styling for offline status', () => {
        expect(getContainmentDisplay('offline')).toEqual({
            color: 'bg-gray-300 text-gray-600',
            label: 'Sensors Offline',
        });
    });
});

describe('getParkAlertLevel', () => {
    it('returns Low for secured dinosaur with normal heart rate and low danger', () => {
        expect(getParkAlertLevel('secured', 1, 'Normal')).toBe('Low');
    });

    it('returns Moderate when danger rating is 2 or above', () => {
        expect(getParkAlertLevel('secured', 2, 'Normal')).toBe('Moderate');
    });

    it('returns High when danger rating is 3+ and heart rate is not Normal', () => {
        expect(getParkAlertLevel('secured', 3, 'Elevated')).toBe('High');
    });

    it('returns Maximum on breach regardless of other factors', () => {
        expect(getParkAlertLevel('breach', 1, 'Normal')).toBe('Maximum');
    });

    it('returns Maximum when danger rating is 4+ and heart rate is Critical', () => {
        expect(getParkAlertLevel('secured', 4, 'Critical')).toBe('Maximum');
    });
});
