import styles from "./Login.module.css";
import {Link} from "react-router-dom";

const Login = () => {
    return (
        <div className={styles.container}>
            <div className={styles.subcontainer}>
                <div className={styles.logo}>
                    <img
                        className={styles.logo}
                        src="https://avatars.githubusercontent.com/u/2487851?s=280&v=4"
                        height="200px"
                        width="200px"
                        alt=""/>
                    <div>
                        <h1>Bienvenue sur</h1>
                        <h1>Norsys</h1>
                        <h1>Parc Informatique</h1>
                    </div>
                </div>
                <form className={styles.form}>
                    <h1>Connexion:</h1>
                    <label>Nom d'utilisateur:</label>
                    <input className={styles.input} type="text" />
                    <label>Mot de passe:</label>
                    <input className={styles.input} type="password" />
                    <button className={styles.button}>Se connecter</button>
                    <span>Tu n'as pas encore de compte ? Insris-toi <Link to="/signup">ici</Link></span>
                </form>
            </div>
        </div>
    )
}
export default Login;