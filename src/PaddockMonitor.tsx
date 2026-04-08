import { useEffect, useState } from 'react';

type Dinosaur = {
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

    // Domain logic: carnivores need feeding more frequently than herbivores.
    // These thresholds are domain rules, not view concerns.
    let feedingUrgency = 'Normal';
    if (dinosaur.diet === 'carnivore') {
        if (hoursSinceFeeding > 12) {
            feedingUrgency = 'Critical';
        } else if (hoursSinceFeeding > 6) {
            feedingUrgency = 'Urgent';
        }
    } else {
        if (hoursSinceFeeding > 24) {
            feedingUrgency = 'Critical';
        } else if (hoursSinceFeeding > 12) {
            feedingUrgency = 'Urgent';
        }
    }

    let lastFedLabel = '';
    if (hoursSinceFeeding < 1) {
        lastFedLabel = 'Less than an hour ago';
    } else if (hoursSinceFeeding < 24) {
        lastFedLabel = `${Math.floor(hoursSinceFeeding)} hours ago`;
    } else {
        lastFedLabel = `${Math.floor(hoursSinceFeeding / 24)} days ago`;
    }

    // Domain logic: safe heart rate ranges differ by species size.
    // Large species (T-Rex, Brachiosaurus) have lower thresholds.
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

    // Domain logic: park alert level is derived from containment status,
    // danger rating, and heart rate — this is a park-wide safety rule,
    // not specific to how this view renders.
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
