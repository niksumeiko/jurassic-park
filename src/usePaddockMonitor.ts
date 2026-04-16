import { useEffect, useState } from 'react';
import { createMonitorViewModel, type Dinosaur } from './paddockMonitorService';
import { fetchDinosaurById } from './domain/dinosaur/dinosaurAdapter';

// use case layer => Orchestrates everything else required to build the view model.
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
