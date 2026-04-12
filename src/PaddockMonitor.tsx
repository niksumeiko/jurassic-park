import { useEffect, useState } from 'react';
import { Dinosaur } from './domain/dinosaur/dinosaurService';
import { useDinosaur } from './domain/dinosaur/DinosaurProvider';
import { getDinosaurStatus } from './application/getDinosaurStatus';

export const PaddockMonitor = () => {
    const [dinosaur, setDinosaur] = useState<Dinosaur>();
    const [isLoading, setIsLoading] = useState(true);
    const { fetchDinosaur } = useDinosaur();
    useEffect(() => {
        void fetchDinosaur()
            .then(setDinosaur)
            .finally(() => setIsLoading(false));
    }, []);

    if (isLoading || !dinosaur) {
        return null;
    }

    const {
        parkAlertLevel,
        statusColor,
        statusLabel,
        feedingUrgency,
        heartRateStatus,
        lastFedLabel,
        name,
        species,
        diet,
        paddock,
        dangerRating,
    } = getDinosaurStatus(dinosaur, Date.now());

    return (
        <main className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-1">{name}</h1>
            <p className="text-gray-500 mb-4 capitalize">
                {species} · {diet} · Paddock {paddock}
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
                    <dd>{dangerRating} / 5</dd>
                </div>
                <div>
                    <dt className="text-sm text-gray-500">Alert Level</dt>
                    <dd>{parkAlertLevel}</dd>
                </div>
            </dl>
        </main>
    );
};
