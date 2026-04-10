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
