import { describe, expect, it } from 'vitest';
import { getFeedingUrgency } from '../getFeedingUrgency';

describe('getFeedingUrgency', () => {
    it('should return Critical for carnivore fed over 12 hours ago', () => {
        const result = getFeedingUrgency({
            diet: 'carnivore',
            hoursSinceFeeding: 13,
        });
        expect(result).toBe('Critical');
    });
    it('should return Urgent for carnivore fed over 6 hours ago', () => {
        const result = getFeedingUrgency({
            diet: 'carnivore',
            hoursSinceFeeding: 7,
        });
        expect(result).toBe('Urgent');
    });
    it('should return Normal for carnivore fed within 6 hours', () => {
        const result = getFeedingUrgency({
            diet: 'carnivore',
            hoursSinceFeeding: 4,
        });
        expect(result).toBe('Normal');
    });
    it('should return Critical for herbivore fed over 24 hours ago', () => {
        const result = getFeedingUrgency({
            diet: 'herbivore',
            hoursSinceFeeding: 28,
        });
        expect(result).toBe('Critical');
    });
    it('should return Urgent for herbivore fed over 12 hours ago', () => {
        const result = getFeedingUrgency({
            diet: 'herbivore',
            hoursSinceFeeding: 13,
        });
        expect(result).toBe('Urgent');
    });
    it('should return Normal for herbivore fed within 12 hours', () => {
        const result = getFeedingUrgency({
            diet: 'herbivore',
            hoursSinceFeeding: 11,
        });
        expect(result).toBe('Normal');
    });
});
