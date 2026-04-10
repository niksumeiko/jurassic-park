import { useEffect, useState } from 'react';
import { getFeedingUrgency } from './helpers/getFeedingUrgency';
import { getHeartLevelStatus } from './helpers/getHeartLevelStatus';
import { getParkAlertLevel } from './helpers/getParkAlertLevel';
import { AlertLevel } from './components/AlertLevel';
import { ContainmentBadge } from './components/ContainmentBadge';
import { DangerRating } from './components/DangerRating';
import { DinoHeader } from './components/DinoHeader';
import { HeartRate } from './components/HeartRate';
import { LastFed } from './components/LastFed';
import { ParkAlertWarning } from './components/ParkAlertWarning';
import { Dinosaur } from './model/dinosaur';

export function PaddockMonitor() {
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
            <DinoHeader
                name={dinosaur.name}
                species={dinosaur.species}
                diet={dinosaur.diet}
                paddock={dinosaur.paddock}
            />

            <ContainmentBadge containmentStatus={dinosaur.containmentStatus} />

            <ParkAlertWarning parkAlertLevel={parkAlertLevel} />

            <dl className="space-y-3">
                <HeartRate
                    heartRate={dinosaur.heartRate}
                    heartLevelStatus={heartLevelStatus}
                />

                <LastFed
                    hoursSinceFeeding={hoursSinceFeeding}
                    feedingUrgency={feedingUrgency}
                />

                <DangerRating dangerRating={dinosaur.dangerRating} />

                <AlertLevel parkAlertLevel={parkAlertLevel} />
            </dl>
        </main>
    );
}
