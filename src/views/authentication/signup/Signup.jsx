import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../../../service/AuthenticationService.js";
import LoaderForButton from "../../../components/loaderForButton/LoaderForButton.jsx";

import { toast, Toaster } from "react-hot-toast";

const Signup = () => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nom: "",
        email: "",
        cin: "",
        telephone: "",
    });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.motDePasse !== formData.confirmMotDePasse) {
            toast.error("Les mots de passe ne correspondent pas", { duration: 2000 });
            return;
        }

        setIsLoading(true);
        try {
            const data = await signupUser({
                nom: formData.nom,
                email: formData.email,
                cin: formData.cin,
                telephone: formData.telephone
            });

            toast.success(data.msg, { duration: 5000 })
            setIsLoading(false);
            setTimeout(() => {
                navigate("/");
            }, 5000)

        } catch (err) {
            toast.error(err.message || "Une erreur est survenue", { duration: 2000 });
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.subcontainer}>
                <div className={styles.logo}>
                    <img
                        className={styles['logo-image']}
                        src="https://avatars.githubusercontent.com/u/2487851?s=280&v=4"
                        alt="Logo"
                    />
                    <div className={styles.titles}>
                        <h1 className={styles.h1}>Bienvenue sur</h1>
                        <h1 className={styles.h1}>Norsys</h1>
                        <h1 className={styles.h1}>Parc Informatique</h1>
                    </div>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h1>Inscription:</h1>

                    <label>Nom:</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                    />

                    <label>Email:</label>
                    <input
                        className={styles.input}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>CIN:</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="cin"
                        value={formData.cin}
                        onChange={handleChange}
                        required
                    />

                    <label>Numéro de téléphone:</label>
                    <input
                        className={styles.input}
                        type="text"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                    />

                    <button className={styles.button} type="submit" disabled={isLoading}>
                        {isLoading ? <LoaderForButton /> : "S'inscrire"}
                    </button>

                    <span>
                        Tu as déjà un compte ? Connecte-toi <Link to="/">ici</Link>
                    </span>
                </form>
                <Toaster position="top-right" reverseOrder={false} />
            </div>
        </div>
    );
};

export default Signup;
