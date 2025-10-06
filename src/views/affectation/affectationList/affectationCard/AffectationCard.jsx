import styles from "./AffectationCard.module.css";
import EditIcon from "../../../../components/icons/EditIcon.jsx";
import DeleteIcon from "../../../../components/icons/DeleteIcon.jsx";
import Eye from "../../../../components/icons/Eye.jsx";

const AffectationCard = ({affectations,onShow,onUpdate,onDelete}) => {
    return (
        <div className={styles["cards-container"]}>
            {affectations.map((affectation) => (
                <div key={affectation.id} className={styles["card"]}>
                    <div className={styles["card-header"]}>
                        <span className={`${styles["status-badge"]} ${styles.active}`}>
                            {affectation.determine ? "Determinée" : "Indeterminée"}
                        </span>
                    </div>

                    <div className={styles["card-body"]}>
                        <div className={styles["card-field"]}>
                            <span className={styles["card-label"]}>Equipement</span>
                            <span className={styles["card-value"]}>
                                {affectation.equipement.nom || "-"}
                            </span>
                        </div>

                        <div className={styles["card-field"]}>
                            <span className={styles["card-label"]}>Utilisateur</span>
                            <span className={styles["card-value"]}>
                                {affectation.utilisateur.nom || "-"}
                            </span>
                        </div>

                        <div className={styles["card-field"]}>
                            <span className={styles["card-label"]}>Date début</span>
                            <span className={styles["card-value"]}>
                                {affectation.date_debut?.split("T")[0] || "-"}
                            </span>
                        </div>

                        {affectation.determine && <div className={styles["card-field"]}>
                            <span className={styles["card-label"]}>Date fin</span>
                            <span className={styles["card-value"]}>
                                {affectation.date_fin?.split("T")[0] || "-"}
                            </span>
                        </div>}


                    </div>

                    <div className={styles["card-actions"]}>
                        <button
                            onClick={() => onShow(affectation.id)}
                            className={`${styles["action-button"]} ${styles["show-btn"]}`}
                            title="Modifier"
                        >
                            <Eye size={26} />
                        </button>
                        <button
                            onClick={() => onUpdate(affectation.id)}
                            className={`${styles["action-button"]} ${styles["edit-btn"]}`}
                            title="Modifier"
                        >
                            <EditIcon />
                        </button>
                        <button
                            onClick={() => onDelete(affectation.id)}
                            className={`${styles["action-button"]} ${styles["delete-btn"]}`}
                            title="Supprimer"
                        >
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AffectationCard;