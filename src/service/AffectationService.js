import { fetchClient } from "./fetchClient.js";
import { store } from "../store/store";

export const createAffectation = async (affectationData) => {
    return fetchClient("/affectations/", "POST", affectationData);
};

export const getAffectations = async () => {
    const { role, id } = store.getState().auth;

    if (role === "ADMIN") {
        return fetchClient("/affectations/");
    } else {
        return fetchClient(`/affectations/utilisateur/${id}`);
    }
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

export const getEquipementsActifsByUtilisateurId = async (utilisateurId) => {
    return fetchClient(`/affectations/utilisateur/${utilisateurId}/equipements-actifs`, "GET");
};
