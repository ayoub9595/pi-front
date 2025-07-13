import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../service/LoginService.js";

const Login = () => {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

   // adapte le chemin selon l'organisation

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser({email, motDePasse});
            localStorage.setItem("access_token", data.access_token);
            console.log("Connexion OK, je redirige...");
            navigate("/home");
        } catch (err) {
            setError(err.message);
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
                    <h1>Connexion:</h1>
                    <label>Nom d'utilisateur:</label>
                    <input
                        className={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label>Mot de passe:</label>
                    <input
                        className={styles.input}
                        type="password"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        required
                    />
                    <button className={styles.button} type="submit">Se connecter</button>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    {/* 👇 Tu m'as dit de NE PAS toucher cette ligne */}
                    <span>Tu n'as pas encore de compte ? Inscris-toi <Link to="/signup">ici</Link></span>
                </form>
            </div>
        </div>
    );
};

export default Login;
