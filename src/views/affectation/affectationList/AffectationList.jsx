import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getAffectations, deleteAffectation } from "../../../service/AffectationService.js";
import ConfirmModal from "../../../components/confirmModal/CofirmModal.jsx";
import Loader from "../../../components/loader/Loader.jsx";
import styles from "./AffectationList.module.css";
import AffectationDetails from "../affectationDetails/AffectationDetails.jsx";
import AffectationTable from "./affectationTable/AffectationTable.jsx";
import AffectationCard from "./affectationCard/AffectationCard.jsx";

const AffectationList = () => {
    const [affectations, setAffectations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [selectedAffectation, setSelectedAffectation] = useState(null);

    const navigate = useNavigate();
    const { role } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchAllAffectations();
    }, []);

    const fetchAllAffectations = async () => {
        try {
            setIsLoading(true);
            const data = await getAffectations();
            setAffectations(data);
        } catch (err) {
            toast.error(err.message || "Erreur lors du chargement des affectations", { duration: 2000 });
        } finally {
            setIsLoading(false);
        }
    };

    const handleShow = (id) => {
        const aff = affectations.find((a) => a.id === id);
        if (aff) {
            setSelectedAffectation(aff);
            setShowDetailsModal(true);
        }
    };

    const handleCloseDetailsModal = () => {
        setShowDetailsModal(false);
        setSelectedAffectation(null);
    };

    const handleUpdate = (id) => {
        navigate(`/home/affectations/edit/${id}`);
    };

    const handleDelete = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const confirmDelete = async () => {
        try {
            setIsLoading(true);
            setShowConfirm(false);
            await deleteAffectation(selectedId);
            toast.success("Affectation supprimée avec succès", { duration: 4000 });
            setAffectations((prev) => prev.filter((a) => a.id !== selectedId));
            setSelectedId(null);
        } catch (err) {
            toast.error(err.message || "Erreur lors de la suppression", { duration: 2000 });
        }finally {
            setIsLoading(false);
        }
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setSelectedId(null);
    };
    
    if (isLoading) {
        return <Loader />;
    }

  
    if (affectations.length === 0) {
        return (
            <div className={styles["no-affectations-container"]}>
                <div className={styles.header}>
                    <h2>Liste des Affectations</h2>
                    {role === "ADMIN" && (
                        <button className={styles["add-button"]} onClick={() => navigate("/home/affectations/create")}>
                            ➕
                        </button>
                    )}
                </div>
                <div className={styles["no-affectations-message"]}>
                    <p>Aucune affectation disponible</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {showConfirm && (
                <ConfirmModal
                    title="Attention !"
                    message="Voulez-vous supprimer cette affectation ?"
                    handleConfirm={confirmDelete}
                    handleCancel={cancelDelete}
                />
            )}

            {showDetailsModal && selectedAffectation && (
                <AffectationDetails affectation={selectedAffectation} handleClose={handleCloseDetailsModal} />
            )}

            <div className={styles.header}>
                <h2>Liste des Affectations</h2>
                {role === "ADMIN" && (
                    <button className={styles["add-button"]} onClick={() => navigate("/home/affectations/create")}>
                        ➕
                    </button>
                )}
            </div>
            <AffectationTable affectations={affectations}
                              handleShow={handleShow}
                              handleUpdate={handleUpdate}
                              handleDelete={handleDelete}
                              role={role}
            />
            <AffectationCard affectations={affectations}
                             onShow={handleShow}
                             onUpdate={handleUpdate}
                             onDelete={handleDelete}
            />
        </div>
    );
};

export default AffectationList;