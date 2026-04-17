import { useEffect, useState } from 'react';
import { createMonitorViewModel } from './PaddockMonitorService';
import type { Dinosaur } from './domain/dinosaur/DinosaurService';
import { fetchDinosaurById } from './domain/dinosaur/DinosaurAdapter';

export const usePaddockMonitor = () => {
    const [dinosaur, setDinosaur] = useState<Dinosaur>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDinosaurById('1')
            .then(setDinosaur)
            .finally(() => setIsLoading(false));
    }, []);

    return createMonitorViewModel(new Date(), dinosaur, isLoading);
};
