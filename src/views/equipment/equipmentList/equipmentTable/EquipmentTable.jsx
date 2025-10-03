import styles from "./EquipmentTable.module.css";
import EditIcon from "../../../../components/icons/EditIcon.jsx";
import DeleteIcon from "../../../../components/icons/DeleteIcon.jsx";
import Eye from "../../../../components/icons/Eye.jsx";

const EquipmentsTable = ({ equipments, onUpdate, onDelete, onShowDetails }) => {
    return (
        <div className={styles["table-container"]}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Numéro de Série</th>
                    <th className={styles['hide-first']}>Date d'Acquisition</th>
                    <th className={styles['hide-second']}>Maintenance Prévue</th>
                    <th>Actif</th>
                    <th className={styles['hide-third']}>Caractéristiques</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {equipments.map((eq) => (
                    <tr key={eq.id}>
                        <td><strong>{eq.nom}</strong></td>
                        <td>{eq.description || "-"}</td>
                        <td>{eq.numero_serie || "-"}</td>
                        <td className={styles['hide-first']}>{eq.date_acquisition?.split("T")[0] || "-"}</td>
                        <td className={styles['hide-second']}>{eq.maintenance_prevue?.split("T")[0] || "-"}</td>
                        <td>
                                <span className={`${styles["status-badge"]} ${eq.est_actif ? styles.active : styles.inactive}`}>
                                    {eq.est_actif ? "Oui" : "Non"}
                                </span>
                        </td>
                        <td className={styles['hide-third']}>
                            <ul style={{ paddingLeft: "16px", margin: 0 }}>
                                {eq.caracteristiques.map((carac, index) => (
                                    <li key={index}>
                                        <strong>{carac.caracteristique}</strong>: {carac.valeur}
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            <div className={styles["action-buttons"]}>
                                <button
                                    className={`${styles["action-button"]} ${styles["show-btn"]}`}
                                    onClick={() => onShowDetails(eq)}
                                    title="Voir les détails"
                                >
                                    <Eye size={20} />
                                </button>
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
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EquipmentsTable;