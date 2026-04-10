import { Dinosaur } from '../PaddockMonitor';

interface GetFeedingUrgencyArgs {
    diet: Dinosaur['diet'];
    hoursSinceFeeding: number;
}

type GetFeedingUrgencyReturn = 'Normal' | 'Critical' | 'Urgent';

export function getFeedingUrgency({
    diet,
    hoursSinceFeeding,
}: GetFeedingUrgencyArgs): GetFeedingUrgencyReturn {
    if (diet === 'carnivore') {
        if (hoursSinceFeeding > 12) return 'Critical';
        if (hoursSinceFeeding > 6) return 'Urgent';
    }

    if (diet === 'herbivore') {
        if (hoursSinceFeeding > 24) return 'Critical';
        if (hoursSinceFeeding > 12) return 'Urgent';
    }

    return 'Normal';
}
