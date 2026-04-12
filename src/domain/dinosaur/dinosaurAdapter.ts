import { Dinosaur } from './dinosaurService';

export type DinosaurResponse = Dinosaur;

function getErrorMessage(err: unknown): string {
    return err instanceof Error ? err.message : 'Something went wrong';
}

export const fetchDinosaur = async (): Promise<DinosaurResponse> => {
    try {
        const response = await fetch('http://localhost:3000/dinosaurs/1');

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const dinosaurs = await response.json();

        return dinosaurs;
    } catch (error: unknown) {
        throw new Error(getErrorMessage(error));
    }
};
