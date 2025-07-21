import { fetchClient } from "./fetchClient.js";

export const getAllUtilisateurs = async () => {
    return fetchClient("/utilisateurs/");
};