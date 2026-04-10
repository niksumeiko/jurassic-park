import { useEffect, useState } from 'react';
import { getContainmentDisplay } from './helpers/getContainmentDisplay';
import { getFeedingUrgency } from './helpers/getFeedingUrgency';
import { getHeartLevelStatus } from './helpers/getHeartLevelStatus';
import { getLastFedLabel } from './helpers/getLastFedLabel';
import { getParkAlertLevel } from './helpers/getParkAlertLevel';

export type Dinosaur = {
    id: string;
    name: string;
    species:
        | 'velociraptor'
        | 'tyrannosaurus'
        | 'triceratops'
        | 'brachiosaurus'
        | 'dilophosaurus';
    diet: 'carnivore' | 'herbivore';
    paddock: string;
    heartRate: number;
    dangerRating: number;
    containmentStatus: 'secured' | 'breach' | 'maintenance' | 'offline';
    lastFedAt: string;
};

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

    const containmentDisplay = getContainmentDisplay({
        containmentStatus: dinosaur.containmentStatus,
    });

    const parkAlertLevel = getParkAlertLevel({
        containmentStatus: dinosaur.containmentStatus,
        dangerRating: dinosaur.dangerRating,
        heartRate: dinosaur.heartRate,
        species: dinosaur.species,
    });

    const heartLevelStatus = getHeartLevelStatus({
        heartRate: dinosaur.heartRate,
        species: dinosaur.species,
    });

    const feedingUrgency = getFeedingUrgency({
        diet: dinosaur.diet,
        hoursSinceFeeding,
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
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${containmentDisplay.color}`}
                >
                    {containmentDisplay.label}
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
                                heartLevelStatus === 'Critical'
                                    ? 'text-red-600 font-bold'
                                    : heartLevelStatus === 'Elevated'
                                      ? 'text-yellow-600'
                                      : 'text-green-600'
                            }
                        >
                            ({heartLevelStatus})
                        </span>
                    </dd>
                </div>
                <div>
                    <dt className="text-sm text-gray-500">Last Fed</dt>
                    <dd>
                        {getLastFedLabel({ hoursSinceFeeding })}{' '}
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
