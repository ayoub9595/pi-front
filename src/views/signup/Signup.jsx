import styles from "../signup/Signup.module.css";
import {Link} from "react-router-dom";

const Signup = () => {
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
                    <h1>Inscripiton:</h1>
                    <label>Nom:</label>
                    <input className={styles.input} type="text" />
                    <label>Prénom:</label>
                    <input className={styles.input} type="text" />
                    <label>Cin:</label>
                    <input className={styles.input} type="text" />
                    <label>Email:</label>
                    <input className={styles.input} type="email" />
                    <label>Numéro de telephone:</label>
                    <input className={styles.input} type="text" />
                    <label>Mot de passe:</label>
                    <input className={styles.input} type="password" />
                    <label>Confirmation de mot de passe:</label>
                    <input className={styles.input} type="password" />
                    <button className={styles.button}>S'inscrire</button>
                    <span>Tu dèja un compte ? Connecte-toi <Link to="/">ici</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Signup;