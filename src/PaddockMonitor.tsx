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
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${viewModel.status.color}`}
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
                            className={
                                viewModel.heartRateStatus === 'Critical'
                                    ? 'text-red-600 font-bold'
                                    : viewModel.heartRateStatus === 'Elevated'
                                      ? 'text-yellow-600'
                                      : 'text-green-600'
                            }
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
                            className={
                                viewModel.feeding.urgency === 'Critical'
                                    ? 'text-red-600 font-bold'
                                    : viewModel.feeding.urgency === 'Urgent'
                                      ? 'text-yellow-600'
                                      : ''
                            }
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
