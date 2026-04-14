import { Dinosaur } from '../model/dinosaur';

type Props = {
    dangerRating: Dinosaur['dangerRating'];
};

export function DangerRating({ dangerRating }: Props) {
    return (
        <div>
            <dt className="text-sm text-gray-500">Danger Rating</dt>
            <dd>{dangerRating} / 5</dd>
        </div>
    );
}
