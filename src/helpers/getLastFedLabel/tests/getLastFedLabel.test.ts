import { describe, expect, it } from 'vitest';
import { getLastFedLabel } from '../getLastFedLabel';

describe('getLastFedLabel', () => {
    it('should return "Less than an hour ago" for under 1 hour', () => {
        const result = getLastFedLabel({ hoursSinceFeeding: 0.5 });

        expect(result).toBe('Less than an hour ago');
    });

    it('should return hours ago for under 24 hours', () => {
        const result = getLastFedLabel({ hoursSinceFeeding: 8.7 });

        expect(result).toBe('8 hours ago');
    });

    it('should return days ago for 24 hours or more', () => {
        const result = getLastFedLabel({ hoursSinceFeeding: 52 });

        expect(result).toBe('2 days ago');
    });
});
