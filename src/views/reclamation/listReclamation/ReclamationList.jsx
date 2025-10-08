import { useEffect, useState } from "react";
import {getReclamations, updateReclamation} from "../../../service/ReclamationService.js";
import styles from "./ReclamationList.module.css";
import ReclamationDetails from "../reclamationDetails/ReclamationDetails.jsx";
import { toast } from "react-hot-toast";
import Loader from "../../../components/loader/Loader.jsx";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import ReclamationTable from "./reclamationTable/ReclamationTable.jsx";
import ReclamationCard from "./reclamationCard/ReclamationCard.jsx";

const ReclamationList = () => {
    const [reclamations, setReclamations] = useState([]);
    const [selectedReclamation, setSelectedReclamation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const role = useSelector((state) => state.auth.role);

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
                    {role !== 'ADMIN' && <button className={styles["add-button"]} onClick={() => navigate("/home/reclamations/create")}>
                        ➕
                    </button>}
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

            <div className={styles.header}>
                <h2>Liste des réclamations</h2>
                {role !== 'ADMIN' && <button className={styles["add-button"]} onClick={() => navigate("/home/reclamations/create")}>
                    ➕
                </button>}
            </div>
            <ReclamationTable reclamations={reclamations} handleShowDetails={handleShowDetails} />
            <ReclamationCard reclamations={reclamations} onShow={handleShowDetails} />
        </>
    );
};

export default ReclamationList;
