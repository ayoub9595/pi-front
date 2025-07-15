import { fetchClient } from "./fetchClient.js";

export const createEquipment = async (equipmentData) => {
    return fetchClient("/equipements/", "POST", equipmentData);
};

export const getEquipments = async () => {
    return fetchClient("/equipements/");
};
export const deleteEquipment = async (id) => {
    return fetchClient(`/equipements/${id}`, "DELETE");
};
export const updateEquipment = async (id, equipmentData) => {
    return fetchClient(`/equipements/${id}`, "PUT", equipmentData);
};
export const getEquipmentById = async (id) => {
    return fetchClient(`/equipements/${id}`, "GET");
};