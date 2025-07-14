import { fetchClient } from "../service/fetchClient.js";

export const createEquipment = async (equipmentData) => {
    return fetchClient("/equipements/", "POST", equipmentData);
};

export const getEquipments = async () => {
    return fetchClient("/equipements/", "GET");
};
