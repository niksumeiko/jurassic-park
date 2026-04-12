import { useEffect, useState } from 'react';
import type { Dinosaur } from '../types/dinosaur';

export function useDinosaur(id: string) {
    const [dinosaur, setDinosaur] = useState<Dinosaur>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/dinosaurs/${id}`)
            .then((response) => response.json())
            .then(setDinosaur)
            .finally(() => setIsLoading(false));
    }, [id]);

    return { dinosaur, isLoading };
}
