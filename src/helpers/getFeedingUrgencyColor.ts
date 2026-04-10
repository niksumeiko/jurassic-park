import { GetFeedingUrgencyReturn } from './getFeedingUrgency';

enum FeedingUrgencyColor {
    Critical = 'text-red-600 font-bold',
    Urgent = 'text-yellow-600',
    Normal = '',
}

const feedingUrgencyColorMap: Record<GetFeedingUrgencyReturn, FeedingUrgencyColor> = {
    Critical: FeedingUrgencyColor.Critical,
    Urgent: FeedingUrgencyColor.Urgent,
    Normal: FeedingUrgencyColor.Normal,
};

interface GetFeedingUrgencyColorArgs {
    feedingUrgency: GetFeedingUrgencyReturn;
}

export function getFeedingUrgencyColor({
    feedingUrgency,
}: GetFeedingUrgencyColorArgs): FeedingUrgencyColor {
    return feedingUrgencyColorMap[feedingUrgency];
}
