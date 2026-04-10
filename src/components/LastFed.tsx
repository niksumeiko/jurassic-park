import { GetFeedingUrgencyReturn } from '../helpers/getFeedingUrgency';
import { getFeedingUrgencyColor } from '../helpers/getFeedingUrgencyColor';
import { getLastFedLabel } from '../helpers/getLastFedLabel';

type Props = {
    hoursSinceFeeding: number;
    feedingUrgency: GetFeedingUrgencyReturn;
};

export function LastFed({ hoursSinceFeeding, feedingUrgency }: Props) {
    const feedingUrgencyColor = getFeedingUrgencyColor({ feedingUrgency });

    return (
        <div>
            <dt className="text-sm text-gray-500">Last Fed</dt>
            <dd>
                {getLastFedLabel({ hoursSinceFeeding })}{' '}
                <span className={feedingUrgencyColor}>
                    — {feedingUrgency}
                </span>
            </dd>
        </div>
    );
}
