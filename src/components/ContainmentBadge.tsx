import { getContainmentDisplay } from '../helpers/getContainmentDisplay';
import { Dinosaur } from '../PaddockMonitor';

type Props = {
    containmentStatus: Dinosaur['containmentStatus'];
};

export function ContainmentBadge({ containmentStatus }: Props) {
    const containmentDisplay = getContainmentDisplay({ containmentStatus });

    return (
        <div className="mb-4">
            <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${containmentDisplay.color}`}
            >
                {containmentDisplay.label}
            </span>
        </div>
    );
}
