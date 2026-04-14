import { describe, expect, it } from 'vitest';
import { getHeartLevelStatusColor } from '../getHeartLevelStatusColor';

describe('getHeartLevelStatusColor', () => {
    it('should return critical color for Critical status', () => {
        const result = getHeartLevelStatusColor({ heartLevelStatus: 'Critical' });

        expect(result).toBe('text-red-600 font-bold');
    });

    it('should return elevated color for Elevated status', () => {
        const result = getHeartLevelStatusColor({ heartLevelStatus: 'Elevated' });

        expect(result).toBe('text-yellow-600');
    });

    it('should return normal color for Normal status', () => {
        const result = getHeartLevelStatusColor({ heartLevelStatus: 'Normal' });

        expect(result).toBe('text-green-600');
    });
});
