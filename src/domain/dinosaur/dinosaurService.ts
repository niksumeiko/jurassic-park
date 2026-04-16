export type Dinosaur = {
    id: string;
    name: string;
    species:
        | 'velociraptor'
        | 'tyrannosaurus'
        | 'triceratops'
        | 'brachiosaurus'
        | 'dilophosaurus';
    diet: 'carnivore' | 'herbivore';
    paddock: string;
    heartRate: number;
    dangerRating: number;
    containmentStatus: 'secured' | 'breach' | 'maintenance' | 'offline';
    lastFedAt: string;
};

export const getFeedingUrgency = (
    dinosaur: Dinosaur,
    hoursSinceFeeding: number,
) => {
    // Domain logic: carnivores need feeding more frequently than herbivores.
    // These thresholds are domain rules, not view concerns.
    let feedingUrgency = 'Normal';
    if (dinosaur.diet === 'carnivore') {
        if (hoursSinceFeeding > 12) {
            feedingUrgency = 'Critical';
        } else if (hoursSinceFeeding > 6) {
            feedingUrgency = 'Urgent';
        }
    } else {
        if (hoursSinceFeeding > 24) {
            feedingUrgency = 'Critical';
        } else if (hoursSinceFeeding > 12) {
            feedingUrgency = 'Urgent';
        }
    }
    return feedingUrgency;
};

export const getHeartRateStatus = (dinosaur: Dinosaur) => {
    if (
        dinosaur.species === 'tyrannosaurus' ||
        dinosaur.species === 'brachiosaurus'
    ) {
        if (dinosaur.heartRate > 120) {
            return 'Elevated';
        }
        if (dinosaur.heartRate > 160) {
            return 'Critical';
        }
    } else {
        if (dinosaur.heartRate > 150) {
            return 'Elevated';
        }
        if (dinosaur.heartRate > 200) {
            return 'Critical';
        }
    }
    return 'Normal';
};
