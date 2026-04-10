import { Dinosaur } from '../PaddockMonitor';
import { getHeartLevelStatus } from './getHeartLevelStatus';

interface GetParkAlertLevelArgs {
    containmentStatus: Dinosaur['containmentStatus'];
    dangerRating: Dinosaur['dangerRating'];
    heartRate: Dinosaur['heartRate'];
    species: Dinosaur['species'];
}

type GetParkAlertLevelReturn = 'Maximum' | 'High' | 'Moderate' | 'Low';

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
