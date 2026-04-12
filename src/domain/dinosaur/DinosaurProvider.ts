import { createGenericContext } from '../../common/context';
import { DinosaurResponse } from './dinosaurAdapter';

export type DinosaurAdapter = {
    fetchDinosaur(): Promise<DinosaurResponse | undefined>;
};

export const { useContext, createContextProvider: createDinosaurProvider } =
    createGenericContext<DinosaurAdapter>();

export const useDinosaur = () => {
    return useContext().value;
};
