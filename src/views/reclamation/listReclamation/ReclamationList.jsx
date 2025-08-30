import { useEffect, useState } from "react";
import {getReclamations, updateReclamation} from "../../../service/ReclamationService.js";
import Eye from "../../../components/icons/Eye.jsx";
import styles from "./ReclamationList.module.css";
import ReclamationDetails from "../reclamationDetails/ReclamationDetails.jsx";
import { toast } from "react-hot-toast";
import Loader from "../../../components/loader/Loader.jsx";
import {useNavigate} from "react-router-dom";

const ReclamationList = () => {
    const [reclamations, setReclamations] = useState([]);
    const [selectedReclamation, setSelectedReclamation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        loadReclamations();
    }, []);

    const loadReclamations = async () => {
        try {
            setLoading(true);
            const response = await getReclamations();
            setReclamations(response);
        } catch (error) {
            toast.error("Erreur chargement données");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleShowDetails = (rec) => {
        setSelectedReclamation(rec);
        setShowDetailsModal(true);
    };

    const handleCloseDetails = () => {
        setShowDetailsModal(false);
        setSelectedReclamation(null);
    };

    const handleProcessReclamation = async (reclamation) => {
        try {
            await updateReclamation(selectedReclamation.id,  reclamation);
            toast.success("Statut de reclamation modifié avec succès");
            const index = reclamations.findIndex(rec => rec.id === selectedReclamation.id);
            if(index > -1) {
                const newReclamations = [...reclamations];
                newReclamations[index].etat_reclamation = reclamation.etat_reclamation;
                newReclamations[index].commentaire = reclamation.commentaire;
                setReclamations(newReclamations);
            }
            setShowDetailsModal(false);
            setSelectedReclamation(null);
        } catch (error) {
            toast.error("Erreur lors de l'acceptation");
            console.error(error);
        }
    };


    if (loading) return <Loader />;

    if (reclamations.length === 0) {
        return (
            <div className={styles["no-affectations-container"]}>
                <div className={styles.header}>
                    <h2>Liste des réclamations</h2>
                        <button className={styles["add-button"]} onClick={() => navigate("/home/reclamations/create")}>
                            ➕
                        </button>
                </div>
                <div className={styles["no-affectations-message"]}>
                    <p>Aucune réclamation disponible</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {showDetailsModal && selectedReclamation && (
                <ReclamationDetails
                    reclamation={selectedReclamation}
                    onClose={handleCloseDetails}
                    onProcess={handleProcessReclamation}
                />
            )}

            <div className={styles["table-container"]}>
                <div className={styles.header}>
                    <h2>Liste des réclamations</h2>
                    <button className={styles["add-button"]} onClick={() => navigate("/home/reclamations/create")}>
                        ➕
                    </button>
                </div>

                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>Nom Utilisateur</th>
                        <th>Équipement</th>
                        <th>Date Réclamation</th>
                        <th>Description</th>
                        <th>Etat de la reclamation</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {reclamations.map((rec) => (
                        <tr key={rec.id}>
                            <td>{rec.utilisateur?.nom ?? "—"}</td>
                            <td>{rec.equipement?.nom ?? "—"}</td>
                            <td>{rec.date_reclamation ? new Date(rec.date_reclamation).toISOString().split("T")[0] : "—"}</td>
                            <td>{rec.description ?? "—"}</td>
                            <td>{rec.etat_reclamation ?? ""}</td>
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
        </>
    );
};

export default ReclamationList;
