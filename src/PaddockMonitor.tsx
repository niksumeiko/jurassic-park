import {
    determineFeedingUrgency,
    determineLastFedLabel,
    determineHeartRateStatus,
    determineContainmentStatusDisplay,
    determineParkAlertLevel,
} from './utils/dinosaur-status';
import { useDinosaur } from './hooks/useDinosaur';

export const PaddockMonitor = () => {
    const { dinosaur, isLoading } = useDinosaur('1');

    if (isLoading || !dinosaur) {
        return null;
    }

    const hoursSinceFeeding =
        (Date.now() - new Date(dinosaur.lastFedAt).getTime()) / 1000 / 60 / 60;

    const feedingUrgency = determineFeedingUrgency({
        diet: dinosaur.diet,
        hoursSinceFeeding,
    });

    const lastFedLabel = determineLastFedLabel(hoursSinceFeeding);

    const heartRateStatus = determineHeartRateStatus({
        species: dinosaur.species,
        heartRate: dinosaur.heartRate,
    });

    const { color: statusColor, label: statusLabel } =
        determineContainmentStatusDisplay(dinosaur.containmentStatus);

    const parkAlertLevel = determineParkAlertLevel({
        containmentStatus: dinosaur.containmentStatus,
        dangerRating: dinosaur.dangerRating,
        heartRateStatus,
    });

    return (
        <main className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-1">{dinosaur.name}</h1>
            <p className="text-gray-500 mb-4 capitalize">
                {dinosaur.species} · {dinosaur.diet} · Paddock{' '}
                {dinosaur.paddock}
            </p>

            <div className="mb-4">
                <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}
                >
                    {statusLabel}
                </span>
            </div>

            {parkAlertLevel === 'Maximum' && (
                <div className="bg-red-600 text-white p-3 rounded mb-4 font-bold">
                    🚨 ALERT LEVEL: MAXIMUM — Evacuate nearby sectors
                </div>
            )}

            <dl className="space-y-3">
                <div>
                    <dt className="text-sm text-gray-500">Heart Rate</dt>
                    <dd>
                        {dinosaur.heartRate} bpm{' '}
                        <span
                            className={
                                heartRateStatus === 'Critical'
                                    ? 'text-red-600 font-bold'
                                    : heartRateStatus === 'Elevated'
                                      ? 'text-yellow-600'
                                      : 'text-green-600'
                            }
                        >
                            ({heartRateStatus})
                        </span>
                    </dd>
                </div>
                <div>
                    <dt className="text-sm text-gray-500">Last Fed</dt>
                    <dd>
                        {lastFedLabel}{' '}
                        <span
                            className={
                                feedingUrgency === 'Critical'
                                    ? 'text-red-600 font-bold'
                                    : feedingUrgency === 'Urgent'
                                      ? 'text-yellow-600'
                                      : ''
                            }
                        >
                            — {feedingUrgency}
                        </span>
                    </dd>
                </div>
                <div>
                    <dt className="text-sm text-gray-500">Danger Rating</dt>
                    <dd>{dinosaur.dangerRating} / 5</dd>
                </div>
                <div>
                    <dt className="text-sm text-gray-500">Alert Level</dt>
                    <dd>{parkAlertLevel}</dd>
                </div>
            </dl>
        </main>
    );
};
