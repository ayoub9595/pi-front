// NotFound.jsx
import {Link, useNavigate} from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles['error-code']}>404</h1>
                <h2 className={styles.title}>
                    Page non trouvée
                </h2>
                <p className={styles.description}>
                    La page que vous recherchez n'existe pas ou a été déplacée.
                </p>
                <div className={styles['button-group']}>
                    <button
                        onClick={goBack}
                        className={`${styles.button} ${styles['primary-button']}`}
                    >
                        Retour
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;