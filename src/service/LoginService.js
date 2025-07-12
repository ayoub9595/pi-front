const API_URL = "http://localhost:5000/auth";

export const loginUser = async ({email, motDePasse}) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, mot_de_passe: motDePasse }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || "Email ou mot de passe incorrect");
        }

        return data;
    } catch (error) {
        throw new Error(error.message || "Erreur de connexion au serveur");
    }
};
