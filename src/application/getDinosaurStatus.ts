import {
    Dinosaur,
    getFeedingUrgency,
    getLastFedLabel,
    getHeartRateStatus,
    getContainmentDisplay,
    getParkAlertLevel,
} from '../domain/dinosaur/dinosaurService';

export type DinosaurViewModel = {
    name: string;
    species: string;
    diet: string;
    paddock: string;
    heartRate: number;
    heartRateStatus: 'Normal' | 'Elevated' | 'Critical';
    feedingUrgency: 'Normal' | 'Urgent' | 'Critical';
    lastFedLabel: string;
    statusColor: string;
    statusLabel: string;
    dangerRating: number;
    parkAlertLevel: 'Low' | 'Moderate' | 'High' | 'Maximum';
};

/**
 * Use case: derives all display-ready data from a raw Dinosaur entity.
 * `now` is injected so this function is pure and easy to test.
 */
export function getDinosaurStatus(
    dinosaur: Dinosaur,
    now: number,
): DinosaurViewModel {
    const hoursSinceFeeding =
        (now - new Date(dinosaur.lastFedAt).getTime()) / 1000 / 60 / 60;
    const feedingUrgency = getFeedingUrgency(dinosaur.diet, hoursSinceFeeding);
    const heartRateStatus = getHeartRateStatus(
        dinosaur.species,
        dinosaur.heartRate,
    );
    const parkAlertLevel = getParkAlertLevel(
        dinosaur.containmentStatus,
        dinosaur.dangerRating,
        heartRateStatus,
    );
    const lastFedLabel = getLastFedLabel(hoursSinceFeeding);
    const { color: containmentColor, label: containmentLabel } =
        getContainmentDisplay(dinosaur.containmentStatus);

    return {
        name: dinosaur.name,
        species: dinosaur.species,
        diet: dinosaur.diet,
        paddock: dinosaur.paddock,
        heartRate: dinosaur.heartRate,
        heartRateStatus,
        feedingUrgency,
        lastFedLabel,
        statusColor: containmentColor,
        statusLabel: containmentLabel,
        dangerRating: dinosaur.dangerRating,
        parkAlertLevel,
    };
}
