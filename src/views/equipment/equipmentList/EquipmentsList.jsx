import { useEffect, useState } from "react";
import { getEquipments, deleteEquipment } from "../../../service/equipmentService.js";
import { useNavigate } from "react-router-dom";
import styles from "./EquipmentList.module.css";
import EditIcon from "../../../components/icons/EditIcon.jsx";
import DeleteIcon from "../../../components/icons/DeleteIcon.jsx";
import ConfirmModal from "../../../components/confirmModal/CofirmModal.jsx";
import {toast} from "react-hot-toast";
import Loader from "../../../components/loader/Loader.jsx";


const EquipmentsList = () => {
    const [equipments, setEquipments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        fetchAllEquipments().catch(console.error);
    }, [navigate]);

    const fetchAllEquipments = async () => {
        try {
            setIsLoading(true);
            const data = await getEquipments();
            setEquipments(data);
        } catch (err) {
            toast.error(err.message || "Erreur lors du chargement des équipements",{duration: 2000});
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/home/equipements/edit/${id}`);
    };

    const handleDelete = (id) => {
        setSelectedId(id);
        setShowConfirm(true)
    }

    const confirmDelete = async () => {
        try {
            await deleteEquipment(selectedId);
            toast.success('Equipement supprimé avec succès',{duration: 4000});
            setShowConfirm(false);
            setEquipments(prev => {
                const newEquipments = [...prev];
                const index = newEquipments.findIndex(equipment => equipment.id === selectedId);
                if (index > -1) {
                    newEquipments.splice(index, 1);
                }
                return newEquipments;
            })
            setSelectedId(null);
        } catch (err) {
            toast.error(err.message || "Erreur lors de la suppression de l'équipement",{duration: 2000});
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
        <div className={styles["table-container"]}>
            {showConfirm && <ConfirmModal
                title="Attention !"
                message="Voulez-vous supprimer cet equipement ?"
                handleConfirm={confirmDelete}
                handleCancel={cancelDelete}
            />
            }
            <div className={styles.header}>
                <h2>Liste des Équipements</h2>
                <div>
                    <button className={styles['add-button']} onClick={() => navigate('/home')}>➕</button>
                </div>
            </div>

            <table className={styles.table}>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Numéro de Série</th>
                    <th>Date d'Acquisition</th>
                    <th>Maintenance Prévue</th>
                    <th>Actif</th>
                    <th>Caractéristiques</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {equipments.map((eq) => (
                    <tr key={eq.id}>
                        <td>{eq.nom}</td>
                        <td>{eq.description || "-"}</td>
                        <td>{eq.numero_serie || "-"}</td>
                        <td>{eq.date_acquisition?.split("T")[0] || "-"}</td>
                        <td>{eq.maintenance_prevue?.split("T")[0] || "-"}</td>
                        <td>{eq.est_actif ? "Oui" : "Non"}</td>
                        <td>
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
                                <button onClick={() => handleUpdate(eq.id)} className={`${styles["action-button"]} ${styles["edit-btn"]}`}>
                                    <EditIcon />
                                </button>
                                <button onClick={() => handleDelete(eq.id)} className={`${styles["action-button"]} ${styles["delete-btn"]}`}>
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

export default EquipmentsList;