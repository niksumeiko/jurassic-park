import { DinosaurViewModel } from './application/getDinosaurStatus';

export const PaddockMonitor = ({
    dinosaur,
}: {
    dinosaur: DinosaurViewModel;
}) => {
    return (
        <main className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-1">{dinosaur.name}</h1>
            <p className="text-gray-500 mb-4 capitalize">
                {dinosaur.species} · {dinosaur.diet} · Paddock{' '}
                {dinosaur.paddock}
            </p>

            <div className="mb-4">
                <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${dinosaur.statusColor}`}
                >
                    {dinosaur.statusLabel}
                </span>
            </div>

            {dinosaur.parkAlertLevel === 'Maximum' && (
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
                                dinosaur.heartRateStatus === 'Critical'
                                    ? 'text-red-600 font-bold'
                                    : dinosaur.heartRateStatus === 'Elevated'
                                      ? 'text-yellow-600'
                                      : 'text-green-600'
                            }
                        >
                            ({dinosaur.heartRateStatus})
                        </span>
                    </dd>
                </div>
                <div>
                    <dt className="text-sm text-gray-500">Last Fed</dt>
                    <dd>
                        {dinosaur.lastFedLabel}{' '}
                        <span
                            className={
                                dinosaur.feedingUrgency === 'Critical'
                                    ? 'text-red-600 font-bold'
                                    : dinosaur.feedingUrgency === 'Urgent'
                                      ? 'text-yellow-600'
                                      : ''
                            }
                        >
                            — {dinosaur.feedingUrgency}
                        </span>
                    </dd>
                </div>
                <div>
                    <dt className="text-sm text-gray-500">Danger Rating</dt>
                    <dd>{dinosaur.dangerRating} / 5</dd>
                </div>
                <div>
                    <dt className="text-sm text-gray-500">Alert Level</dt>
                    <dd>{dinosaur.parkAlertLevel}</dd>
                </div>
            </dl>
        </main>
    );
};
