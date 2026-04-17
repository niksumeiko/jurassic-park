export const fetchDinosaurById = async (id: string) => {
    const response = await fetch(`http://localhost:3000/dinosaurs/${id}`);
    return response.json();
};
