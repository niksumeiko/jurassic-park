import {
    type Dinosaur,
    getFeedingUrgency,
    getHeartRateStatus,
} from './domain/dinosaur/DinosaurService';

export const createMonitorViewModel = (
    currentDate: Date,
    dinosaur?: Dinosaur,
    loading?: boolean,
) => {
    // move all the business logic here.

    if (!dinosaur || loading) {
        return undefined;
    }

    const hoursSinceFeeding =
        (currentDate.getTime() - new Date(dinosaur.lastFedAt).getTime()) /
        1000 /
        60 /
        60;

    const feedingUrgency = getFeedingUrgency(dinosaur, hoursSinceFeeding);

    let lastFedLabel = '';
    if (hoursSinceFeeding < 1) {
        lastFedLabel = 'Less than an hour ago';
    } else if (hoursSinceFeeding < 24) {
        lastFedLabel = `${Math.floor(hoursSinceFeeding)} hours ago`;
    } else {
        lastFedLabel = `${Math.floor(hoursSinceFeeding / 24)} days ago`;
    }

    // Domain logic: safe heart rate ranges differ by species size.
    // Large species (T-Rex, Brachiosaurus) have lower thresholds.
    const heartRateStatus = getHeartRateStatus(dinosaur);

    let statusLabel = 'Unknown';
    let statusState = 'unknown';
    if (dinosaur.containmentStatus === 'secured') {
        statusLabel = 'Secured';
        statusState = 'secured';
    } else if (dinosaur.containmentStatus === 'breach') {
        statusLabel = '⚠ BREACH';
        statusState = 'breach';
    } else if (dinosaur.containmentStatus === 'maintenance') {
        statusLabel = 'Under Maintenance';
        statusState = 'wip';
    } else if (dinosaur.containmentStatus === 'offline') {
        statusLabel = 'Sensors Offline';
        statusState = 'offline';
    }

    // Domain logic: park alert level is derived from containment status,
    // danger rating, and heart rate — this is a park-wide safety rule,
    // not specific to how this view renders.

    let parkAlertLevel = 'Low';
    if (
        dinosaur.containmentStatus === 'breach' ||
        (dinosaur.dangerRating >= 4 && heartRateStatus === 'Critical')
    ) {
        parkAlertLevel = 'Maximum';
    } else if (dinosaur.dangerRating >= 3 && heartRateStatus !== 'Normal') {
        parkAlertLevel = 'High';
    } else if (dinosaur.dangerRating >= 2) {
        parkAlertLevel = 'Moderate';
    }

    /**
     * This is the view model:
     * information about dinosaur:
     * - name
     * - species
     * - diet
     * - paddock
     * - heart rate
     * - danger rating
     * - containment status
     * - last fed at
     * - status
     * - - color
     * - -label
     * - park alert level and (shouldDisplayParkAlert?)
     * - heart rate status
     * - feeding (label and urgency)
     */
    return {
        name: dinosaur.name,
        species: dinosaur.species,
        diet: dinosaur.diet,
        paddock: dinosaur.paddock,
        heartRate: dinosaur.heartRate,
        dangerRating: dinosaur.dangerRating,
        containmentStatus: dinosaur.containmentStatus,
        lastFedAt: dinosaur.lastFedAt,
        status: {
            state: statusState,
            label: statusLabel,
        },
        parkAlertLevel: parkAlertLevel,
        shouldDisplayParkAlert: parkAlertLevel === 'Maximum',
        heartRateStatus: heartRateStatus,
        feeding: {
            label: lastFedLabel,
            urgency: feedingUrgency,
        },
    };
};
