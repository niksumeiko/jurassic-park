import type { FC, ReactNode } from 'react';
import { memo, useMemo } from 'react';

import type { ProviderWithValue } from './createGenericContext';

interface Props {
    providers: ContextProviderType[];
    children: ReactNode;
}

type FCWithChildren = FC<{ children: ReactNode }>;

export type ContextProviderType = ProviderWithValue | FCWithChildren;

const ContextWrapper: FCWithChildren = memo(({ children }) => <>{children}</>);

const composeProviders = (wrappers: ContextProviderType[]): FCWithChildren => {
    return wrappers.reduce<FCWithChildren>((Acc, Context): FCWithChildren => {
        const ContextWithValue = Context as ProviderWithValue;
        if (ContextWithValue?.defaultValue) {
            return (props) => (
                <ContextWithValue.Provider value={ContextWithValue.defaultValue}>
                    <Acc {...props} />
                </ContextWithValue.Provider>
            );
        }

        const ContextFC = Context as FCWithChildren;
        return (props) => (
            <ContextFC>
                <Acc {...props} />
            </ContextFC>
        );
    }, ContextWrapper);
};

/**
 * Composes a list of context providers into a single wrapper, allowing flat configuration
 * instead of deeply nested JSX.
 *
 * This component acts as a DI container — it builds a stable component tree from the
 * registered providers. For this to work correctly:
 *
 * **`providers` must be a stable reference** (defined at module level or memoized).
 * Passing an inline array literal will cause `useMemo` to miss on every render,
 * producing new component identities and remounting the entire subtree.
 *
 * @example
 * // ✓ Correct — stable reference, defined outside the component
 * const PROVIDERS = [createFooProvider('value'), BarProvider];
 * <ContextProvider providers={PROVIDERS}><App /></ContextProvider>
 *
 * @example
 * // ✗ Incorrect — new array on every render, breaks memoization
 * <ContextProvider providers={[createFooProvider('value'), BarProvider]}>
 *   <App />
 * </ContextProvider>
 */
export const ContextProvider: FC<Props> = memo(({ providers, children }) => {
    const ComposedProviders = useMemo(() => composeProviders(providers), [providers]);

    return <ComposedProviders>{children}</ComposedProviders>;
});
