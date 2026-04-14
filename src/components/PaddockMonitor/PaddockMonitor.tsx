import {
    getFeedingUrgency,
    getHeartLevelStatus,
    getParkAlertLevel,
} from '../../helpers';
import { AlertLevel } from '../AlertLevel';
import { ContainmentBadge } from '../ContainmentBadge';
import { DangerRating } from '../DangerRating';
import { DinoHeader } from '../DinoHeader';
import { HeartRate } from '../HeartRate';
import { LastFed } from '../LastFed';
import { ParkAlertWarning } from '../ParkAlertWarning';
import { useGetDinosaur } from './hooks/useGetDinosaur';

export function PaddockMonitor() {
    const { dinosaur, isLoading } = useGetDinosaur();

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
