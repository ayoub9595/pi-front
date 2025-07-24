import { useEffect, useState } from "react";
import { getAffectations, deleteAffectation } from "../../service/affectationService.js";
import { useNavigate } from "react-router-dom";
import EditIcon from "../../components/icons/EditIcon.js";
import DeleteIcon from "../../components/icons/DeleteIcon.js";
import ConfirmModal from "../../components/confirmModal/CofirmModal.jsx";
import { toast } from "react-hot-toast";
import styles from "./AffectationList.module.css";
import Eye from "../../components/icons/Eye.jsx";

const AffectationList = () => {
    const [affectations, setAffectations] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllAffectations().catch(console.error);
    }, [navigate]);

    const fetchAllAffectations = async () => {
        try {
            const data = await getAffectations();
            setAffectations(data);
        } catch (err) {
            toast.error(err.message || "Erreur lors du chargement des affectations", { duration: 2000 });
        }
    };

    const handleShow = id => {
        console.log('You want to show affectation with id:',id)
    }

    const handleUpdate = id => {
        navigate(`/home/affectations/edit/${id}`);
    };

    const handleDelete = id => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteAffectation(selectedId);
            toast.success("Affectation supprimée avec succès", { duration: 4000 });
            setShowConfirm(false);
            setAffectations((prev) => prev.filter((a) => a.id !== selectedId));
            setSelectedId(null);
        } catch (err) {
            toast.error(err.message || "Erreur lors de la suppression", { duration: 2000 });
        }
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setSelectedId(null);
    };

    return affectations.length > 0 ? (
        <div className={styles["table-container"]}>
            {showConfirm && (
                <ConfirmModal
                    title="Attention !"
                    message="Voulez-vous supprimer cette affectation ?"
                    handleConfirm={confirmDelete}
                    handleCancel={cancelDelete}
                />
            )}
            <div className={styles.header}>
                <h2>Liste des Affectations</h2>
                <button className={styles["add-button"]} onClick={() => navigate("/home/affectations/create")}>
                    ➕
                </button>
            </div>
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
                        <td>{a.nom_equipement || "-"}</td>
                        <td>{a.nom_utilisateur || "-"}</td>
                        <td>{a.date_debut?.split("T")[0] || "-"}</td>
                        <td>{a.date_fin?.split("T")[0] || "-"}</td>
                        <td>{a.determine ? "Oui" : "Non"}</td>
                        <td>
                            <div className={styles["action-buttons"]}>
                                <button
                                    onClick={() => handleShow(a.id)}
                                    className={`${styles["action-button"]} ${styles["show-btn"]}`}
                                >
                                    <Eye size={26} />
                                </button>
                                <button
                                    onClick={() => handleUpdate(a.id)}
                                    className={`${styles["action-button"]} ${styles["edit-btn"]}`}
                                >
                                    <EditIcon />
                                </button>
                                <button
                                    onClick={() => handleDelete(a.id)}
                                    className={`${styles["action-button"]} ${styles["delete-btn"]}`}
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
    ) : (
        <p>Loading ...</p>
    );
};

export default AffectationList;
