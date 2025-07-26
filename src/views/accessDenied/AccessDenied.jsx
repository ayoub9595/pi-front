import { useNavigate } from "react-router-dom";
import styles from "./AccessDenied.module.css";

const AccessDenied = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles['icon-container']}>
                    <svg
                        className={styles.icon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                    </svg>
                </div>
                <h1 className={styles.title}>
                    Accès refusé
                </h1>
                <h2 className={styles.subtitle}>
                    Autorisations insuffisantes
                </h2>
                <p className={styles.description}>
                    Vous ne disposez pas des autorisations nécessaires pour accéder à cette page. Veuillez contacter votre administrateur si vous pensez qu'il s'agit d'une erreur.
                </p>
                <div className={styles['button-group']}>
                    <button
                        onClick={goBack}
                        className={`${styles.button} ${styles['primary-button']}`}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccessDenied;