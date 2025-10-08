import styles from "./ReclamationCard.module.css";
import Eye from "../../../../components/icons/Eye.jsx";

const ReclamationCard = ({reclamations,onShow}) => {
    const getStatusBadge = status => {
        switch (status) {
            case 'Acceptée':
                return 'accepted';
            case 'Refusée':
                return 'refused';
            default:
                return '';
        }
    }
    return (
        <div className={styles["cards-container"]}>
            {reclamations.map((reclmation) => (
                <div key={reclmation.id} className={styles["card"]}>
                    <div className={styles["card-header"]}>
                        <span className={`${styles["status-badge"]} ${styles[getStatusBadge(reclmation.etat_reclamation)]}`}>
                            {reclmation.etat_reclamation}
                        </span>
                    </div>

                    <div className={styles["card-body"]}>
                        <div className={styles["card-field"]}>
                            <span className={styles["card-label"]}>Nom utilisateur</span>
                            <span className={styles["card-value"]}>
                                {reclmation.utilisateur?.nom|| "-"}
                            </span>
                        </div>

                        <div className={styles["card-field"]}>
                            <span className={styles["card-label"]}>Equipement</span>
                            <span className={styles["card-value"]}>
                                {reclmation.equipement?.nom|| "-"}
                            </span>
                        </div>

                        <div className={styles["card-field"]}>
                            <span className={styles["card-label"]}>Date Réclamation</span>
                            <span className={styles["card-value"]}>
                                {reclmation.date_reclamation ? new Date(reclmation.date_reclamation).toISOString().split("T")[0] : "—"}
                            </span>
                        </div>

                       <div className={styles["card-field"]}>
                            <span className={styles["card-label"]}>Description</span>
                            <span className={styles["card-value"]}>
                                {reclmation.description ?? "—"}
                            </span>
                        </div>


                    </div>

                    <div className={styles["card-actions"]}>
                        <button
                            onClick={() => onShow(reclmation)}
                            className={`${styles["action-button"]} ${styles["show-btn"]}`}
                            title="Modifier"
                        >
                            <Eye size={26} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ReclamationCard;
