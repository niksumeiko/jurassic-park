import { describe, expect, it } from 'vitest';
import { getContainmentDisplay } from '../getContainmentDisplay';

describe('getContainmentDisplay', () => {
    it('should return secured display', () => {
        const result = getContainmentDisplay({ containmentStatus: 'secured' });

        expect(result).toEqual({
            color: 'bg-green-100 text-green-800',
            label: 'Secured',
        });
    });

    it('should return breach display', () => {
        const result = getContainmentDisplay({ containmentStatus: 'breach' });

        expect(result).toEqual({
            color: 'bg-red-100 text-red-800',
            label: '⚠ BREACH',
        });
    });

    it('should return maintenance display', () => {
        const result = getContainmentDisplay({
            containmentStatus: 'maintenance',
        });

        expect(result).toEqual({
            color: 'bg-yellow-100 text-yellow-800',
            label: 'Under Maintenance',
        });
    });

    it('should return offline display', () => {
        const result = getContainmentDisplay({ containmentStatus: 'offline' });

        expect(result).toEqual({
            color: 'bg-gray-300 text-gray-600',
            label: 'Sensors Offline',
        });
    });

    it('should return unknown display for unrecognized status', () => {
        const result = getContainmentDisplay({
            containmentStatus: 'something-else' as never,
        });

        expect(result).toEqual({
            color: 'bg-gray-100 text-gray-800',
            label: 'Unknown',
        });
    });
});
