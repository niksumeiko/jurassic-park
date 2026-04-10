import { describe, expect, it } from 'vitest';
import { getFeedingUrgencyColor } from '../getFeedingUrgencyColor';

describe('getFeedingUrgencyColor', () => {
    it('should return critical color for Critical urgency', () => {
        const result = getFeedingUrgencyColor({ feedingUrgency: 'Critical' });

        expect(result).toBe('text-red-600 font-bold');
    });

    it('should return urgent color for Urgent urgency', () => {
        const result = getFeedingUrgencyColor({ feedingUrgency: 'Urgent' });

        expect(result).toBe('text-yellow-600');
    });

    it('should return empty string for Normal urgency', () => {
        const result = getFeedingUrgencyColor({ feedingUrgency: 'Normal' });

        expect(result).toBe('');
    });
});
