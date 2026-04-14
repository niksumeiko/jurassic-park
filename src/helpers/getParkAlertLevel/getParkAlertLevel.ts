import { Dinosaur } from '../../model/dinosaur';
import { getHeartLevelStatus } from '../getHeartLevelStatus/getHeartLevelStatus';

interface GetParkAlertLevelArgs {
    containmentStatus: Dinosaur['containmentStatus'];
    dangerRating: Dinosaur['dangerRating'];
    heartRate: Dinosaur['heartRate'];
    species: Dinosaur['species'];
}

export type GetParkAlertLevelReturn = 'Maximum' | 'High' | 'Moderate' | 'Low';

export function getParkAlertLevel({
    containmentStatus,
    dangerRating,
    heartRate,
    species,
}: GetParkAlertLevelArgs): GetParkAlertLevelReturn {
    const heartLevelStatus = getHeartLevelStatus({ heartRate, species });

    if (containmentStatus === 'breach') {
        return 'Maximum';
    }
    if (dangerRating >= 4 && heartLevelStatus === 'Critical') {
        return 'Maximum';
    }
    if (dangerRating >= 3 && heartLevelStatus !== 'Normal') {
        return 'High';
    }
    if (dangerRating >= 2) {
        return 'Moderate';
    }
    return 'Low';
}
