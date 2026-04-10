import { GetParkAlertLevelReturn } from '../helpers/getParkAlertLevel';

type Props = {
    parkAlertLevel: GetParkAlertLevelReturn;
};

export function AlertLevel({ parkAlertLevel }: Props) {
    return (
        <div>
            <dt className="text-sm text-gray-500">Alert Level</dt>
            <dd>{parkAlertLevel}</dd>
        </div>
    );
}
