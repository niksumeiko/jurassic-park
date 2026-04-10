import { GetHeartLevelStatusReturn } from './getHeartLevelStatus';

enum HeartLevelStatusColor {
    Critical = 'text-red-600 font-bold',
    Elevated = 'text-yellow-600',
    Normal = 'text-green-600',
}

const heartLevelStatusColorMap: Record<GetHeartLevelStatusReturn, HeartLevelStatusColor> = {
    Critical: HeartLevelStatusColor.Critical,
    Elevated: HeartLevelStatusColor.Elevated,
    Normal: HeartLevelStatusColor.Normal,
};

interface GetHeartLevelStatusColorArgs {
    heartLevelStatus: GetHeartLevelStatusReturn;
}

export function getHeartLevelStatusColor({
    heartLevelStatus,
}: GetHeartLevelStatusColorArgs): HeartLevelStatusColor {
    return heartLevelStatusColorMap[heartLevelStatus];
}
