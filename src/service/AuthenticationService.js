import { fetchClient } from "./fetchClient.js";

export const loginUser = async ({ email, motDePasse }) => {
    try {
        const data = await fetchClient("/auth/login", "POST", {
            email,
            mot_de_passe: motDePasse,
        });
        return data;
    } catch (error) {
        throw new Error(error.message || "Erreur lors de la connexion");
    }
};

export const signupUser = async ({ nom, email, cin, telephone, motDePasse, role = "UTILISATEUR" }) => {
    try {
        const data = await fetchClient("/auth/signup", "POST", {
            nom,
            email,
            cin,
            telephone,
            mot_de_passe: motDePasse,
            role,
        });
        return data;
    } catch (error) {
        throw new Error(error.message || "Erreur lors de l'inscription");
    }
};
