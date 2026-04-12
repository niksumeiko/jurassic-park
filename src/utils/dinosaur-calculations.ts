import type { Dinosaur } from '../types/dinosaur';

type Diet = 'carnivore' | 'herbivore';
type FeedingUrgency = 'Critical' | 'Urgent' | 'Normal';
type HeartRateStatus = 'Critical' | 'Elevated' | 'Normal';
type ContainmentStatus = Dinosaur['containmentStatus'];

export function determineFeedingUrgency({
    diet,
    hoursSinceFeeding,
}: {
    diet: Diet;
    hoursSinceFeeding: number;
}): FeedingUrgency {
    if (diet === 'carnivore') {
        if (hoursSinceFeeding > 12) return 'Critical';
        if (hoursSinceFeeding > 6) return 'Urgent';
        return 'Normal';
    }

    if (hoursSinceFeeding > 24) return 'Critical';
    if (hoursSinceFeeding > 12) return 'Urgent';
    return 'Normal';
}

export function determineLastFedLabel(hoursSinceFeeding: number): string {
    if (hoursSinceFeeding < 1) {
        return 'Less than an hour ago';
    }

    if (hoursSinceFeeding < 24) {
        return `${Math.floor(hoursSinceFeeding)} hours ago`;
    }

    return `${Math.floor(hoursSinceFeeding / 24)} days ago`;
}

export function determineHeartRateStatus({
    species,
    heartRate,
}: {
    species: Dinosaur['species'];
    heartRate: number;
}): HeartRateStatus {
    const isLargeSpecies =
        species === 'tyrannosaurus' || species === 'brachiosaurus';

    if (isLargeSpecies) {
        if (heartRate > 160) return 'Critical';
        if (heartRate > 120) return 'Elevated';
        return 'Normal';
    }

    if (heartRate > 200) return 'Critical';
    if (heartRate > 150) return 'Elevated';
    return 'Normal';
}

export function determineContainmentStatusDisplay(
    status: ContainmentStatus,
): {
    color: string;
    label: string;
} {
    const displays: Record<ContainmentStatus, { color: string; label: string }> =
        {
            secured: {
                color: 'bg-green-100 text-green-800',
                label: 'Secured',
            },
            breach: { color: 'bg-red-100 text-red-800', label: '⚠ BREACH' },
            maintenance: {
                color: 'bg-yellow-100 text-yellow-800',
                label: 'Under Maintenance',
            },
            offline: {
                color: 'bg-gray-300 text-gray-600',
                label: 'Sensors Offline',
            },
        };

    return displays[status];
}
