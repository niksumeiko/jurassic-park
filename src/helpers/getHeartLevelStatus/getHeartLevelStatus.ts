import { Dinosaur } from '../../model/dinosaur';

interface GetHeartLevelStatusArgs {
    species: Dinosaur['species'];
    heartRate: Dinosaur['heartRate'];
}

export type GetHeartLevelStatusReturn = 'Elevated' | 'Critical' | 'Normal';

export function getHeartLevelStatus({
    heartRate,
    species,
}: GetHeartLevelStatusArgs): GetHeartLevelStatusReturn {
    if (species === 'tyrannosaurus' || species === 'brachiosaurus') {
        if (heartRate > 160) {
            return 'Critical';
        }
        if (heartRate > 120) {
            return 'Elevated';
        }
        return 'Normal';
    }

    if (heartRate > 200) {
        return 'Critical';
    }

    if (heartRate > 150) {
        return 'Elevated';
    }

    return 'Normal';
}
