import { Dinosaur } from '../PaddockMonitor';

enum ContainmentColor {
    Secured = 'bg-green-100 text-green-800',
    Breach = 'bg-red-100 text-red-800',
    Maintenance = 'bg-yellow-100 text-yellow-800',
    Offline = 'bg-gray-300 text-gray-600',
    Unknown = 'bg-gray-100 text-gray-800',
}

enum ContainmentLabel {
    Secured = 'Secured',
    Breach = '⚠ BREACH',
    Maintenance = 'Under Maintenance',
    Offline = 'Sensors Offline',
    Unknown = 'Unknown',
}

interface GetContainmentDisplayArgs {
    containmentStatus: Dinosaur['containmentStatus'];
}

interface GetContainmentDisplayReturn {
    color: ContainmentColor;
    label: ContainmentLabel;
}

export function getContainmentDisplay({
    containmentStatus,
}: GetContainmentDisplayArgs): GetContainmentDisplayReturn {
    if (containmentStatus === 'secured') {
        return { color: ContainmentColor.Secured, label: ContainmentLabel.Secured };
    }
    if (containmentStatus === 'breach') {
        return { color: ContainmentColor.Breach, label: ContainmentLabel.Breach };
    }
    if (containmentStatus === 'maintenance') {
        return { color: ContainmentColor.Maintenance, label: ContainmentLabel.Maintenance };
    }
    if (containmentStatus === 'offline') {
        return { color: ContainmentColor.Offline, label: ContainmentLabel.Offline };
    }
    return { color: ContainmentColor.Unknown, label: ContainmentLabel.Unknown };
}
