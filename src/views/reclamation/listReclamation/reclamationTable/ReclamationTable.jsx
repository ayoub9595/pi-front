import styles from "./ReclamationTable.module.css";
import Eye from "../../../../components/icons/Eye.jsx";

const ReclamationTable = ({reclamations,handleShowDetails}) => {
    return (
        <div className={styles["table-container"]}>

            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Nom Utilisateur</th>
                    <th>Équipement</th>
                    <th>Date Réclamation</th>
                    <th className={styles['hide-first']}>Description</th>
                    <th className={styles['hide-second']}>Etat de la reclamation</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {reclamations.map((rec) => (
                    <tr key={rec.id}>
                        <td>{rec.utilisateur?.nom ?? "—"}</td>
                        <td>{rec.equipement?.nom ?? "—"}</td>
                        <td>{rec.date_reclamation ? new Date(rec.date_reclamation).toISOString().split("T")[0] : "—"}</td>
                        <td className={styles['hide-first']}>{rec.description ?? "—"}</td>
                        <td className={styles['hide-second']}>{rec.etat_reclamation ?? ""}</td>
                        <td>
                            <button
                                onClick={() => handleShowDetails(rec)}
                                className={`${styles["action-button"]} ${styles["show-btn"]}`}
                                title="Voir détails"
                            >
                                <Eye size={24} />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}
export default ReclamationTable;