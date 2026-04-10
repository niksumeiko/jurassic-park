import { Dinosaur } from '../PaddockMonitor';
import { GetHeartLevelStatusReturn } from '../helpers/getHeartLevelStatus';
import { getHeartLevelStatusColor } from '../helpers/getHeartLevelStatusColor';

type Props = {
    heartRate: Dinosaur['heartRate'];
    heartLevelStatus: GetHeartLevelStatusReturn;
};

export function HeartRate({ heartRate, heartLevelStatus }: Props) {
    const heartLevelStatusColor = getHeartLevelStatusColor({ heartLevelStatus });

    return (
        <div>
            <dt className="text-sm text-gray-500">Heart Rate</dt>
            <dd>
                {heartRate} bpm{' '}
                <span className={heartLevelStatusColor}>
                    ({heartLevelStatus})
                </span>
            </dd>
        </div>
    );
}
