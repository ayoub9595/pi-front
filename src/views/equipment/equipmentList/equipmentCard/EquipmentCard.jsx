import styles from "./EquipmentCard.module.css";
import EditIcon from "../../../../components/icons/EditIcon.jsx";
import DeleteIcon from "../../../../components/icons/DeleteIcon.jsx";


const EquipmentsCards = ({ equipments, onUpdate, onDelete }) => {
    return (
        <div className={styles["cards-container"]}>
            {equipments.map((eq) => (
                <div key={eq.id} className={styles["equipment-card"]}>
                    <div className={styles["equipment-card-header"]}>
                        <span className={styles["equipment-card-title"]}>{eq.nom}</span>
                        <span className={`${styles["status-badge"]} ${eq.est_actif ? styles.active : styles.inactive}`}>
                            {eq.est_actif ? "Actif" : "Inactif"}
                        </span>
                    </div>

                    <div className={styles["equipment-card-body"]}>
                        <div className={styles["equipment-card-field"]}>
                            <span className={styles["equipment-card-label"]}>Description</span>
                            <span className={styles["equipment-card-value"]}>
                                {eq.description || "-"}
                            </span>
                        </div>

                        <div className={styles["equipment-card-field"]}>
                            <span className={styles["equipment-card-label"]}>N° Série</span>
                            <span className={styles["equipment-card-value"]}>
                                {eq.numero_serie || "-"}
                            </span>
                        </div>

                        <div className={styles["equipment-card-field"]}>
                            <span className={styles["equipment-card-label"]}>Date acquisition</span>
                            <span className={styles["equipment-card-value"]}>
                                {eq.date_acquisition?.split("T")[0] || "-"}
                            </span>
                        </div>

                        <div className={styles["equipment-card-field"]}>
                            <span className={styles["equipment-card-label"]}>Maintenance</span>
                            <span className={styles["equipment-card-value"]}>
                                {eq.maintenance_prevue?.split("T")[0] || "-"}
                            </span>
                        </div>

                        {eq.caracteristiques && eq.caracteristiques.length > 0 && (
                            <div className={styles["equipment-card-field"]}>
                                <span className={styles["equipment-card-label"]}>Caractéristiques</span>
                                <div className={styles["equipment-card-value"]}>
                                    <ul style={{ paddingLeft: "16px", margin: 0, textAlign: "left" }}>
                                        {eq.caracteristiques.map((carac, index) => (
                                            <li key={index}>
                                                <strong>{carac.caracteristique}</strong>: {carac.valeur}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles["equipment-card-actions"]}>
                        <button
                            onClick={() => onUpdate(eq.id)}
                            className={`${styles["action-button"]} ${styles["edit-btn"]}`}
                            title="Modifier"
                        >
                            <EditIcon />
                        </button>
                        <button
                            onClick={() => onDelete(eq.id)}
                            className={`${styles["action-button"]} ${styles["delete-btn"]}`}
                            title="Supprimer"
                        >
                            <DeleteIcon />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EquipmentsCards;