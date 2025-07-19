import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getEquipmentById,
    updateEquipment,
} from "../../service/equipmentService.js";

import styles from "./EditEquipment.module.css";
import DeleteIcon from "../../components/icons/DeleteIcon";
import {toast} from "react-hot-toast";

const EditEquipment = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [equipment, setEquipment] = useState(null);

    useEffect(() => {
        const fetchEquipment = async () => {
            try {
                const data = await getEquipmentById(id);
                setEquipment(data);
            } catch (err) {
                toast.error("Erreur lors du chargement de l’équipement",{duration: 2000});
            }
        };

        fetchEquipment();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEquipment((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleCaracChange = (index, field, value) => {
        const updated = [...equipment.caracteristiques];
        updated[index][field] = value;
        setEquipment((prev) => ({ ...prev, caracteristiques: updated }));
    };

    const handleAddCaracteristique = () => {
        setEquipment((prev) => ({
            ...prev,
            caracteristiques: [...prev.caracteristiques, { caracteristique: "", valeur: "" }],
        }));
    };

    const handleRemoveCaracteristique = (index) => {
        const updated = equipment.caracteristiques.filter((_, i) => i !== index);
        setEquipment((prev) => ({ ...prev, caracteristiques: updated }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateEquipment(id, equipment);
            toast.success("Equipement modifié avec succès",{duration: 4000});
            navigate("/home/equipements");
        } catch (err) {
            toast.error(err.message || "Erreur lors de la mise à jour",{duration: 2000});
        }
    };

    if (!equipment) return <p style={{ padding: "20px" }}>Chargement...</p>;

    return (
        <>
            <h2>Modifier un Équipement</h2>

            <form className={styles.form} onSubmit={handleSubmit}>
                <label>Nom:</label>
                <input
                    className={styles.input}
                    name="nom"
                    value={equipment.nom}
                    onChange={handleChange}
                    required
                />

                <label>Description:</label>
                <textarea
                    className={styles.input}
                    name="description"
                    value={equipment.description}
                    onChange={handleChange}
                />

                <label>Numéro de série:</label>
                <input
                    className={styles.input}
                    name="numero_serie"
                    value={equipment.numero_serie}
                    onChange={handleChange}
                    required
                />

                <label>Date d'acquisition:</label>
                <input
                    className={styles.input}
                    type="date"
                    name="date_acquisition"
                    value={equipment.date_acquisition?.split("T")[0]}
                    onChange={handleChange}
                    required
                />

                <label>Date de maintenance prévue:</label>
                <input
                    className={styles.input}
                    type="date"
                    name="maintenance_prevue"
                    value={equipment.maintenance_prevue?.split("T")[0]}
                    onChange={handleChange}
                />

                <label>
                    Actif:
                    <input
                        type="checkbox"
                        name="est_actif"
                        checked={equipment.est_actif}
                        onChange={handleChange}
                    />
                </label>

                <div className={styles["caracteristiques-headers"]}>
                    <h4>Caractéristiques</h4>
                    <button
                        type="button"
                        onClick={handleAddCaracteristique}
                        className={`${styles.button} ${styles["add-caracteristique"]}`}
                    >
                        ➕
                    </button>
                </div>

                {equipment.caracteristiques.map((carac, index) => (
                    <div key={index} className={styles.caracteristique}>
                        <div className={styles["caracteristique-section"]}>
                            <label>Nom:</label>
                            <input
                                className={styles.input}
                                name="caracteristique"
                                value={carac.caracteristique}
                                onChange={(e) => handleCaracChange(index, "caracteristique", e.target.value)}
                            />
                        </div>
                        <div className={styles["caracteristique-section"]}>
                            <label>Valeur:</label>
                            <input
                                className={styles.input}
                                name="valeur"
                                value={carac.valeur}
                                onChange={(e) => handleCaracChange(index, "valeur", e.target.value)}
                            />
                        </div>
                            <button
                                type="button"
                                onClick={() => handleRemoveCaracteristique(index)}
                                className={styles.button}
                            >
                                <DeleteIcon />
                            </button>
                    </div>
                ))}

                <button type="submit" className={styles.button}>
                    Enregistrer
                </button>
            </form>
        </>
    );
};

export default EditEquipment;
