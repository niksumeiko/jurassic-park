import { describe, expect, it } from 'vitest';
import { getHeartLevelStatus } from '../getHeartLevelStatus';

describe('getHeartLevelStatus', () => {
    it('should return Critical for tyrannosaurus with heart rate over 160', () => {
        const result = getHeartLevelStatus({
            species: 'tyrannosaurus',
            heartRate: 170,
        });

        expect(result).toBe('Critical');
    });

    it('should return Elevated for tyrannosaurus with heart rate over 120', () => {
        const result = getHeartLevelStatus({
            species: 'tyrannosaurus',
            heartRate: 130,
        });

        expect(result).toBe('Elevated');
    });

    it('should return Normal for tyrannosaurus with heart rate under 120', () => {
        const result = getHeartLevelStatus({
            species: 'tyrannosaurus',
            heartRate: 100,
        });

        expect(result).toBe('Normal');
    });

    it('should return Critical for brachiosaurus with heart rate over 160', () => {
        const result = getHeartLevelStatus({
            species: 'brachiosaurus',
            heartRate: 170,
        });

        expect(result).toBe('Critical');
    });

    it('should return Critical for other species with heart rate over 200', () => {
        const result = getHeartLevelStatus({
            species: 'velociraptor',
            heartRate: 210,
        });

        expect(result).toBe('Critical');
    });

    it('should return Elevated for other species with heart rate over 150', () => {
        const result = getHeartLevelStatus({
            species: 'velociraptor',
            heartRate: 160,
        });

        expect(result).toBe('Elevated');
    });

    it('should return Normal for other species with heart rate under 150', () => {
        const result = getHeartLevelStatus({
            species: 'velociraptor',
            heartRate: 140,
        });

        expect(result).toBe('Normal');
    });
});
