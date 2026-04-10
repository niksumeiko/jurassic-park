interface GetLastFedLabelArgs {
    hoursSinceFeeding: number;
}

export function getLastFedLabel({
    hoursSinceFeeding,
}: GetLastFedLabelArgs): string {
    if (hoursSinceFeeding < 1) {
        return 'Less than an hour ago';
    }

    if (hoursSinceFeeding < 24) {
        return `${Math.floor(hoursSinceFeeding)} hours ago`;
    }

    return `${Math.floor(hoursSinceFeeding / 24)} days ago`;
}
