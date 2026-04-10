import { useEffect, useState } from 'react';
import { Dinosaur } from '../../../model/dinosaur';

export function useGetDinosaur() {
    const [dinosaur, setDinosaur] = useState<Dinosaur>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/dinosaurs/1')
            .then((response) => response.json())
            .then(setDinosaur)
            .finally(() => setIsLoading(false));
    }, []);

    return { dinosaur, isLoading };
}
