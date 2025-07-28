import { fetchClient } from "./fetchClient.js";
import { store } from "../store/store";

export const createReclamation = async (reclamationData) => {
    return fetchClient("/reclamations/", "POST", reclamationData);
};

export const getReclamations = async () => {
    const { role, id } = store.getState().auth;

    if (role === "ADMIN") {
        return fetchClient("/reclamations/");
    } else {
        return fetchClient(`/reclamations/utilisateur/${id}`);
    }
};

export const getReclamationById = async (id) => {
    return fetchClient(`/reclamations/${id}`, "GET");
};

export const updateReclamation = async (id, reclamationData) => {
    return fetchClient(`/reclamations/${id}`, "PUT", reclamationData);
};

export const deleteReclamation = async (id) => {
    return fetchClient(`/reclamations/${id}`, "DELETE");
};

