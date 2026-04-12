import { useEffect, useState } from 'react';
import { PaddockMonitor } from './PaddockMonitor';
import { useDinosaur } from './domain/dinosaur/DinosaurProvider';
import { getDinosaurStatus } from './application/getDinosaurStatus';
import { Dinosaur } from './domain/dinosaur/dinosaurService';

export const PaddockPage = () => {
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

    const dinosaurVM = getDinosaurStatus(dinosaur, Date.now());

    return <PaddockMonitor dinosaur={dinosaurVM} />;
};
