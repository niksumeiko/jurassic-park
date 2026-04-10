import {
    GetHeartLevelStatusReturn,
    getHeartLevelStatusColor,
} from '../helpers';
import { Dinosaur } from '../model/dinosaur';

type Props = {
    heartRate: Dinosaur['heartRate'];
    heartLevelStatus: GetHeartLevelStatusReturn;
};

export function HeartRate({ heartRate, heartLevelStatus }: Props) {
    const heartLevelStatusColor = getHeartLevelStatusColor({
        heartLevelStatus,
    });

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
