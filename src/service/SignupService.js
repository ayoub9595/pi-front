const API_URL = "http://localhost:5000/auth";

export const signupUser = async ({ nom, email, cin, telephone, motDePasse, role = "UTILISATEUR" }) => {
    try {
        const response = await fetch(`${API_URL}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nom,
                email,
                cin,
                telephone,
                mot_de_passe: motDePasse,
                role
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.msg || "Erreur lors de l'inscription");
        }

        return data;
    } catch (error) {
        throw new Error(error.message || "Erreur de connexion au serveur");
    }
};
