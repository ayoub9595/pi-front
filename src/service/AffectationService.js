import { fetchClient } from "./fetchClient.js";

export const createAffectation = async (affectationData) => {
    return fetchClient("/affectations/", "POST", affectationData);
};

export const getAffectations = async () => {
    return fetchClient("/affectations/");
};

export const getAffectationById = async (id) => {
    return fetchClient(`/affectations/${id}`, "GET");
};

export const updateAffectation = async (id, affectationData) => {
    return fetchClient(`/affectations/${id}`, "PUT", affectationData);
};

export const deleteAffectation = async (id) => {
    return fetchClient(`/affectations/${id}`, "DELETE");
};
export const getUnassignedEquipments = async () => {
    return fetchClient("/equipments/unassigned");
};
