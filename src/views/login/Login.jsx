import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { loginUser } from "../../service/AuthenticationService.js";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../store/authSlice.js";
import { toast, Toaster } from "react-hot-toast";
import { getCurrentUserRole } from "../../routerUtils/authUtils.js";

const Login = () => {
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await loginUser({ email, motDePasse });

            const token = data.access_token;
            localStorage.setItem("access_token", token);

            const { sub, email: userEmail, role } = jwtDecode(token);

            dispatch(setCredentials({ id: sub, email: userEmail, role }));

            const userRole = getCurrentUserRole();

            if (userRole === "ADMIN") {
                navigate("/home/equipements", { replace: true });
            } else if (userRole === "UTILISATEUR") {
                navigate("/home/dashboard", { replace: true });
            } else {
                localStorage.removeItem("access_token");
                toast.error("Rôle inconnu, accès refusé", { duration: 2000 });
            }
        } catch (err) {
            localStorage.removeItem("access_token");
            toast.error(err.message || "Une erreur est survenue", { duration: 2000 });
        } finally {
            setIsLoading(false);
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
                        alt="Logo"
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
                        disabled={isLoading}
                    />
                    <label>Mot de passe:</label>
                    <input
                        className={styles.input}
                        type="password"
                        value={motDePasse}
                        onChange={(e) => setMotDePasse(e.target.value)}
                        required
                        disabled={isLoading}
                    />
                    <button
                        className={styles.button}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? "Connexion..." : "Se connecter"}
                    </button>

                    <span>
                        Tu n'as pas encore de compte ? Inscris-toi <Link to="/signup">ici</Link>
                    </span>
                </form>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
        </div>
    );
};

export default Login;