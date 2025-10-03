import { useEffect, useState } from "react";
import { getEquipments, deleteEquipment } from "../../../service/equipmentService.js";
import { useNavigate } from "react-router-dom";
import styles from "./EquipmentList.module.css";
import ConfirmModal from "../../../components/confirmModal/CofirmModal.jsx";
import InfoModal from "../../../components/infoModal/InfoModal.jsx";
import { toast } from "react-hot-toast";
import Loader from "../../../components/loader/Loader.jsx";
import EquipmentsTable from "./equipmentTable/EquipmentTable.jsx";
import EquipmentsCards from "./equipmentCard/EquipmentCard.jsx";
import EquipmentDetails from "../equipmentDetails/EquipmentDetails.jsx";

const EquipmentsList = () => {
    const [equipments, setEquipments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllEquipments().catch(console.error);
    }, [navigate]);

    const fetchAllEquipments = async () => {
        try {
            setIsLoading(true);
            const data = await getEquipments();
            setEquipments(data);
        } catch (err) {
            toast.error(err.message || "Erreur lors du chargement des équipements", { duration: 2000 });
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/home/equipements/edit/${id}`);
    };

    const handleDelete = (id) => {
        setSelectedId(id);
        setShowConfirm(true);
    };

    const handleShowDetails = (equipment) => {
        setSelectedEquipment(equipment);
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setShowDetails(false);
        setSelectedEquipment(null);
    };

    const confirmDelete = async () => {
        try {
            await deleteEquipment(selectedId);
            toast.success('Equipement supprimé avec succès', { duration: 4000 });
            setShowConfirm(false);
            setEquipments(prev => {
                const newEquipments = [...prev];
                const index = newEquipments.findIndex(equipment => equipment.id === selectedId);
                if (index > -1) {
                    newEquipments.splice(index, 1);
                }
                return newEquipments;
            });
            setSelectedId(null);
        } catch (err) {
            toast.error(err.message || "Erreur lors de la suppression de l'équipement", { duration: 2000 });
        }
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setSelectedId(null);
    };

    if (isLoading) {
        return <Loader />;
    }

    if (equipments.length === 0) {
        return (
            <div className={styles["no-equipment-container"]}>
                <div className={styles.header}>
                    <h2>Liste des Équipements</h2>
                    <div>
                        <button className={styles['add-button']} onClick={() => navigate('/home')}>➕</button>
                    </div>
                </div>
                <div className={styles["no-equipment-message"]}>
                    <p>Aucun équipement disponible. Veuillez ajouter un.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {showConfirm && (
                <ConfirmModal
                    title="Attention !"
                    message="Voulez-vous supprimer cet equipement ?"
                    handleConfirm={confirmDelete}
                    handleCancel={cancelDelete}
                />
            )}

            {showDetails && selectedEquipment && ( <EquipmentDetails equipment={selectedEquipment} handleClose={handleCloseDetails} /> )}

            <div className={styles.header}>
                <h2>Liste des Équipements</h2>
                <div>
                    <button className={styles['add-button']} onClick={() => navigate('/home')}>➕</button>
                </div>
            </div>

            <EquipmentsTable
                equipments={equipments}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onShowDetails={handleShowDetails}
            />

            <EquipmentsCards
                equipments={equipments}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </>
    );
};

export default EquipmentsList;