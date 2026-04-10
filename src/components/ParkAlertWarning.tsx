import { GetParkAlertLevelReturn } from '../helpers/getParkAlertLevel';

type Props = {
    parkAlertLevel: GetParkAlertLevelReturn;
};

export function ParkAlertWarning({ parkAlertLevel }: Props) {
    return (
        <>
            {parkAlertLevel === 'Maximum' && (
                <div className="bg-red-600 text-white p-3 rounded mb-4 font-bold">
                    🚨 ALERT LEVEL: MAXIMUM — Evacuate nearby sectors
                </div>
            )}
        </>
    );
}
