import styles from "../signup/Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupUser } from "../../service/AuthenticationService.js";
import {jwtDecode} from "jwt-decode";
import {setCredentials} from "../../store/authSlice.js";
import {useDispatch} from "react-redux";
import {toast, Toaster} from "react-hot-toast";

const Signup = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        nom: "",
        email: "",
        cin: "",
        telephone: "",
        motDePasse: "",
        confirmMotDePasse: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.motDePasse !== formData.confirmMotDePasse) {
            toast.error("Les mots de passe ne correspondent pas", {duration: 2000});
            return;
        }

        try {
            const data = await signupUser({
                nom: formData.nom,
                email: formData.email,
                cin: formData.cin,
                telephone: formData.telephone,
                motDePasse: formData.motDePasse,
                role: formData.role,  // Envoi du rôle
            });

            localStorage.setItem("access_token", data.access_token);
            const {sub,email,role} = jwtDecode(data.access_token);

            dispatch(setCredentials({ id:sub,email, role }));

            if (role === "ADMIN") {
                navigate("/home/equipements");
            } else if (role === "UTILISATEUR") {
                navigate("/home/dashboard");
            } else {
                toast.error("Rôle inconnu, accès refusé", {duration: 2000});
            }

        } catch (err) {
            toast.error(err.message, {duration: 2000});
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.subcontainer}>
                <div className={styles.logo}>
                    <img
                        className={styles.logo}
                        src="https://avatars.githubusercontent.com/u/2487851?s=280&v=4"
                        height="200px"
                        width="200px"
                        alt=""
                    />
                    <div>
                        <h1>Bienvenue sur</h1>
                        <h1>Norsys</h1>
                        <h1>Parc Informatique</h1>
                    </div>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <h1>Inscription:</h1>

                    <label>Nom:</label>
                    <input className={styles.input} type="text" name="nom" value={formData.nom} onChange={handleChange} required />

                    <label>Email:</label>
                    <input className={styles.input} type="email" name="email" value={formData.email} onChange={handleChange} required />

                    <label>CIN:</label>
                    <input className={styles.input} type="text" name="cin" value={formData.cin} onChange={handleChange} required />

                    <label>Numéro de téléphone:</label>
                    <input className={styles.input} type="text" name="telephone" value={formData.telephone} onChange={handleChange} required />

                    <label>Mot de passe:</label>
                    <input className={styles.input} type="password" name="motDePasse" value={formData.motDePasse} onChange={handleChange} required />

                    <label>Confirmation du mot de passe:</label>
                    <input className={styles.input} type="password" name="confirmMotDePasse" value={formData.confirmMotDePasse} onChange={handleChange} required />


                    <button className={styles.button} type="submit">S'inscrire</button>


                    <span>Tu as déjà un compte ? Connecte-toi <Link to="/">ici</Link></span>
                </form>
                <Toaster
                    position="top-right"
                    reverseOrder={false}/>
            </div>
        </div>
    );
};

export default Signup;
