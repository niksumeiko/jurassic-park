import { describe, expect, it } from 'vitest';
import { getParkAlertLevel } from '../getParkAlertLevel';

describe('getParkAlertLevel', () => {
    it('should return Maximum for breach containment status', () => {
        const result = getParkAlertLevel({
            containmentStatus: 'breach',
            dangerRating: 1,
            heartRate: 80,
            species: 'velociraptor',
        });

        expect(result).toBe('Maximum');
    });

    it('should return Maximum for high danger with critical heart rate', () => {
        const result = getParkAlertLevel({
            containmentStatus: 'secured',
            dangerRating: 4,
            heartRate: 210,
            species: 'velociraptor',
        });

        expect(result).toBe('Maximum');
    });

    it('should return High for danger >= 3 with non-normal heart rate', () => {
        const result = getParkAlertLevel({
            containmentStatus: 'secured',
            dangerRating: 3,
            heartRate: 160,
            species: 'velociraptor',
        });

        expect(result).toBe('High');
    });

    it('should return Moderate for danger >= 2', () => {
        const result = getParkAlertLevel({
            containmentStatus: 'secured',
            dangerRating: 2,
            heartRate: 80,
            species: 'velociraptor',
        });

        expect(result).toBe('Moderate');
    });

    it('should return Low for low danger and normal status', () => {
        const result = getParkAlertLevel({
            containmentStatus: 'secured',
            dangerRating: 1,
            heartRate: 80,
            species: 'velociraptor',
        });

        expect(result).toBe('Low');
    });
});
