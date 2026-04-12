export type Dinosaur = {
    id: string;
    name: string;
    species: Species;
    diet: Diet;
    paddock: string;
    heartRate: number;
    dangerRating: number;
    containmentStatus: 'secured' | 'breach' | 'maintenance' | 'offline';
    lastFedAt: string;
};
export type Diet = 'carnivore' | 'herbivore';
export type Species =
    | 'velociraptor'
    | 'tyrannosaurus'
    | 'triceratops'
    | 'brachiosaurus'
    | 'dilophosaurus';
type HeartRateStatus = 'Normal' | 'Elevated' | 'Critical';

const LARGE_SPECIES: Species[] = ['tyrannosaurus', 'brachiosaurus'];
type FeedingUrgency = 'Normal' | 'Urgent' | 'Critical';

export function getFeedingUrgency(
    diet: Diet,
    hoursSinceFeeding: number,
): FeedingUrgency {
    if (diet === 'carnivore') {
        if (hoursSinceFeeding > 12) return 'Critical';
        if (hoursSinceFeeding > 6) return 'Urgent';
    } else {
        if (hoursSinceFeeding > 24) return 'Critical';
        if (hoursSinceFeeding > 12) return 'Urgent';
    }
    return 'Normal';
}

type ContainmentStatus = 'secured' | 'breach' | 'maintenance' | 'offline';
type ContainmentDisplay = { color: string; label: string };

const CONTAINMENT_DISPLAY: Record<ContainmentStatus, ContainmentDisplay> = {
    secured: { color: 'bg-green-100 text-green-800', label: 'Secured' },
    breach: { color: 'bg-red-100 text-red-800', label: '⚠ BREACH' },
    maintenance: {
        color: 'bg-yellow-100 text-yellow-800',
        label: 'Under Maintenance',
    },
    offline: { color: 'bg-gray-300 text-gray-600', label: 'Sensors Offline' },
};

export function getContainmentDisplay(
    status: ContainmentStatus,
): ContainmentDisplay {
    return CONTAINMENT_DISPLAY[status];
}

export function getHeartRateStatus(
    species: Species,
    heartRate: number,
): HeartRateStatus {
    if (LARGE_SPECIES.includes(species)) {
        if (heartRate > 160) return 'Critical';
        if (heartRate > 120) return 'Elevated';
    } else {
        if (heartRate > 200) return 'Critical';
        if (heartRate > 150) return 'Elevated';
    }
    return 'Normal';
}

type AlertLevel = 'Low' | 'Moderate' | 'High' | 'Maximum';

export function getParkAlertLevel(
    containmentStatus: ContainmentStatus,
    dangerRating: number,
    heartRateStatus: HeartRateStatus,
): AlertLevel {
    if (
        containmentStatus === 'breach' ||
        (dangerRating >= 4 && heartRateStatus === 'Critical')
    ) {
        return 'Maximum';
    }
    if (dangerRating >= 3 && heartRateStatus !== 'Normal') return 'High';
    if (dangerRating >= 2) return 'Moderate';
    return 'Low';
}

export function getLastFedLabel(hoursSinceFeeding: number): string {
    if (hoursSinceFeeding < 1) return 'Less than an hour ago';
    if (hoursSinceFeeding < 24)
        return `${Math.floor(hoursSinceFeeding)} hours ago`;
    return `${Math.floor(hoursSinceFeeding / 24)} days ago`;
}
