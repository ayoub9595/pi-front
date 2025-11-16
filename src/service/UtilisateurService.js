import { fetchClient } from "./fetchClient.js";

export const getAllUtilisateurs = async () => {
    return fetchClient("/utilisateurs/");
};

export const getUtilisateur = async (id) => {
    return fetchClient(`/utilisateurs/${id}`)
}

export const updateUtilisateur = async (utilisateur) => {
    return fetchClient(`/utilisateurs/${utilisateur.id}`, 'PUT',utilisateur)
}