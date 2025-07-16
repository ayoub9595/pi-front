import { useEffect, useState } from "react";
import { getEquipments, deleteEquipment } from "../../service/equipmentService.js";
import { useNavigate } from "react-router-dom";
import styles from "./EquipmentList.module.css";
import EditIcon from "../../components/icons/EditIcon.js";
import DeleteIcon from "../../components/icons/DeleteIcon.js";
import ConfirmModal from "../../components/confirmModal/CofirmModal.jsx";


const EquipmentsList = () => {
    const [equipments, setEquipments] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            setTimeout(() => navigate("/"), 100);
        }
        fetchAllEquipments();
    }, []);

    const fetchAllEquipments = async () => {
        try {
            const data = await getEquipments();
            setEquipments(data);
        } catch (err) {
            setError("Erreur lors du chargement des équipements");
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
            setError("Erreur lors de la suppression de l’équipement");
        }
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setSelectedId(null);
    };
    return (
        equipments.length > 0 ? (
                <div className={styles["table-container"]}>
                    {showConfirm && <ConfirmModal
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
                    {error && <p style={{ color: "red" }}>{error}</p>}

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

            ): <p>Loading ...</p>
    );
};

export default EquipmentsList;
