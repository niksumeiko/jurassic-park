import { useEffect, useState } from 'react';
import type { Dinosaur } from './types/dinosaur';
import {
    determineFeedingUrgency,
    determineLastFedLabel,
} from './utils/dinosaur-calculations';

export const PaddockMonitor = () => {
    const [dinosaur, setDinosaur] = useState<Dinosaur>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/dinosaurs/1')
            .then((response) => response.json())
            .then(setDinosaur)
            .finally(() => setIsLoading(false));
    }, []);

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

    let heartRateStatus = 'Normal';
    if (
        dinosaur.species === 'tyrannosaurus' ||
        dinosaur.species === 'brachiosaurus'
    ) {
        if (dinosaur.heartRate > 120) {
            heartRateStatus = 'Elevated';
        }
        if (dinosaur.heartRate > 160) {
            heartRateStatus = 'Critical';
        }
    } else {
        if (dinosaur.heartRate > 150) {
            heartRateStatus = 'Elevated';
        }
        if (dinosaur.heartRate > 200) {
            heartRateStatus = 'Critical';
        }
    }

    let statusColor = 'bg-gray-100 text-gray-800';
    let statusLabel = 'Unknown';
    if (dinosaur.containmentStatus === 'secured') {
        statusColor = 'bg-green-100 text-green-800';
        statusLabel = 'Secured';
    } else if (dinosaur.containmentStatus === 'breach') {
        statusColor = 'bg-red-100 text-red-800';
        statusLabel = '⚠ BREACH';
    } else if (dinosaur.containmentStatus === 'maintenance') {
        statusColor = 'bg-yellow-100 text-yellow-800';
        statusLabel = 'Under Maintenance';
    } else if (dinosaur.containmentStatus === 'offline') {
        statusColor = 'bg-gray-300 text-gray-600';
        statusLabel = 'Sensors Offline';
    }

    let parkAlertLevel = 'Low';
    if (
        dinosaur.containmentStatus === 'breach' ||
        (dinosaur.dangerRating >= 4 && heartRateStatus === 'Critical')
    ) {
        parkAlertLevel = 'Maximum';
    } else if (dinosaur.dangerRating >= 3 && heartRateStatus !== 'Normal') {
        parkAlertLevel = 'High';
    } else if (dinosaur.dangerRating >= 2) {
        parkAlertLevel = 'Moderate';
    }

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
