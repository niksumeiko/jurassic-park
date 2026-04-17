import cx from 'classnames';
import { usePaddockMonitor } from './usePaddockMonitor';

export const PaddockMonitor = () => {
    const viewModel = usePaddockMonitor();

    if (!viewModel) {
        return null;
    }

    return (
        <main className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-1">{viewModel.name}</h1>
            <p className="text-gray-500 mb-4 capitalize">
                {viewModel.species} · {viewModel.diet} · Paddock{' '}
                {viewModel.paddock}
            </p>

            <div className="mb-4">
                <span
                    className={cx(
                        `inline-block px-3 py-1 rounded-full text-sm font-medium`,
                        {
                            'bg-gray-100 text-gray-800':
                                viewModel.status.state === 'unknown',
                            'bg-green-100 text-green-800':
                                viewModel.status.state === 'secured',
                            'bg-red-100 text-red-800':
                                viewModel.status.state === 'breach',
                            'bg-yellow-100 text-yellow-800':
                                viewModel.status.state === 'wip',
                            'bg-gray-300 text-gray-600':
                                viewModel.status.state === 'offline',
                        },
                    )}
                >
                    {viewModel.status.label}
                </span>
            </div>

            {viewModel.shouldDisplayParkAlert && (
                <div className="bg-red-600 text-white p-3 rounded mb-4 font-bold">
                    🚨 ALERT LEVEL: MAXIMUM — Evacuate nearby sectors
                </div>
            )}

            <dl className="space-y-3">
                <div>
                    <dt className="text-sm text-gray-500">Heart Rate</dt>
                    <dd>
                        {viewModel.heartRate} bpm{' '}
                        <span
                            className={cx({
                                'text-red-600 font-bold':
                                    viewModel.heartRateStatus === 'Critical',
                                'text-yellow-600':
                                    viewModel.heartRateStatus === 'Elevated',
                                'text-green-600':
                                    viewModel.heartRateStatus === 'Normal',
                            })}
                        >
                            ({viewModel.heartRateStatus})
                        </span>
                    </dd>
                </div>
                <div>
                    <dt className="text-sm text-gray-500">Last Fed</dt>
                    <dd>
                        {viewModel.feeding.label}{' '}
                        <span
                            className={cx({
                                'text-red-600 font-bold':
                                    viewModel.heartRateStatus === 'Critical',
                                'text-yellow-600':
                                    viewModel.heartRateStatus === 'Urgent',
                            })}
                        >
                            — {viewModel.feeding.urgency}
                        </span>
                    </dd>
                </div>
                <div>
                    <dt className="text-sm text-gray-500">Danger Rating</dt>
                    <dd>{viewModel.dangerRating} / 5</dd>
                </div>
                <div>
                    <dt className="text-sm text-gray-500">Alert Level</dt>
                    <dd>{viewModel.parkAlertLevel}</dd>
                </div>
            </dl>
        </main>
    );
};
