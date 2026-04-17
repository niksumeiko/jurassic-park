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
    if (dinosaur.diet === 'carnivore') {
        if (hoursSinceFeeding > 12) {
            return 'Critical';
        }

        if (hoursSinceFeeding > 6) {
            return 'Urgent';
        }
    }

    if (hoursSinceFeeding > 24) {
        return 'Critical';
    }

    if (hoursSinceFeeding > 12) {
        return 'Urgent';
    }

    return 'Normal';
};

export const getHeartRateStatus = (dinosaur: Dinosaur) => {
    if (
        dinosaur.species === 'tyrannosaurus' ||
        dinosaur.species === 'brachiosaurus'
    ) {
        if (dinosaur.heartRate > 160) {
            return 'Critical';
        }
        if (dinosaur.heartRate > 120) {
            return 'Elevated';
        }
    } else {
        if (dinosaur.heartRate > 200) {
            return 'Critical';
        }
        if (dinosaur.heartRate > 150) {
            return 'Elevated';
        }
    }
    return 'Normal';
};
