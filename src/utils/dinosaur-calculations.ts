type Diet = 'carnivore' | 'herbivore';
type FeedingUrgency = 'Critical' | 'Urgent' | 'Normal';

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
