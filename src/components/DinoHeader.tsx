import { Dinosaur } from '../PaddockMonitor';

type Props = {
    name: Dinosaur['name'];
    species: Dinosaur['species'];
    diet: Dinosaur['diet'];
    paddock: Dinosaur['paddock'];
};

export function DinoHeader({ name, species, diet, paddock }: Props) {
    return (
        <>
            <h1 className="text-2xl font-bold mb-1">{name}</h1>
            <p className="text-gray-500 mb-4 capitalize">
                {species} · {diet} · Paddock {paddock}
            </p>
        </>
    );
}
