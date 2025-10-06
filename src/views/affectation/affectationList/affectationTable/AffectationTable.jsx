import styles from "./AffectationTable.module.css";
import Eye from "../../../../components/icons/Eye.jsx";
import EditIcon from "../../../../components/icons/EditIcon.jsx";
import DeleteIcon from "../../../../components/icons/DeleteIcon.jsx";

const AffectationTable = ({affectations,role,handleShow,handleUpdate,handleDelete}) => {
    return (
        <div className={styles["table-container"]}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Équipement</th>
                    <th>Utilisateur</th>
                    <th>Date Début</th>
                    <th>Date Fin</th>
                    <th>Déterminé</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {affectations.map((a) => (
                    <tr key={a.id}>
                        <td>{a.equipement.nom || "-"}</td>
                        <td>{a.utilisateur.nom || "-"}</td>
                        <td>{a.date_debut?.split("T")[0] || "-"}</td>
                        <td>{a.date_fin?.split("T")[0] || "-"}</td>
                        <td>{a.determine ? "Oui" : "Non"}</td>
                        <td>
                            <div className={styles["action-buttons"]}>
                                <button
                                    onClick={() => handleShow(a.id)}
                                    className={`${styles["action-button"]} ${styles["show-btn"]}`}
                                >
                                    <Eye size={26}/>
                                </button>
                                {role === "ADMIN" && (
                                    <>
                                        <button
                                            onClick={() => handleUpdate(a.id)}
                                            className={`${styles["action-button"]} ${styles["edit-btn"]}`}
                                        >
                                            <EditIcon/>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(a.id)}
                                            className={`${styles["action-button"]} ${styles["delete-btn"]}`}
                                        >
                                            <DeleteIcon/>
                                        </button>
                                    </>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default AffectationTable