import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEquipment } from "../../service/equipmentService";
import styles from "./AppEquipment.module.css";
import DeleteIcon from "../../components/icons/DeleteIcon.js";
import {toast} from "react-hot-toast";

const AddEquipment = () => {
    const navigate = useNavigate();

    const [equipment, setEquipment] = useState({
        nom: "",
        description: "",
        numero_serie: "",
        date_acquisition: "",
        maintenance_prevue: "",
        est_actif: true,
    });

    const [caracteristiques, setCaracteristiques] = useState([]);


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setEquipment({
            ...equipment,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleCaracChange = (index, e) => {
        const { name, value } = e.target;
        const updated = [...caracteristiques];
        updated[index][name] = value;
        setCaracteristiques(updated);
    };

    const addCaracField = () => {
        setCaracteristiques([...caracteristiques, { caracteristique: "", valeur: "" }]);
    };

    const removeCaracField = (index) => {
        setCaracteristiques(caracteristiques.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullData = {
            ...equipment,
            caracteristiques: caracteristiques.filter(
                (c) => c.caracteristique.trim() && c.valeur.trim()
            ),
        };

        try {
            await createEquipment(fullData);
            toast.success("Équipement ajouté avec succès !",{duration: 4000});
            navigate("/home/equipements");
        } catch (err) {
            toast.error(err.message || "Erreur inattendue lors de l'ajout.",{duration: 2000});
        }
    };

    return (
        <>
            <h2>Ajouter un Équipement</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>Nom:</label>
                <input
                    className={styles.input}
                    onChange={handleInputChange}
                    name="nom"
                    required
                />
                <label>Description:</label>
                <textarea
                    className={styles.input}
                    onChange={handleInputChange}
                    name="description"
                />
                <label>Numéro de série:</label>
                <input
                    className={styles.input}
                    onChange={handleInputChange}
                    name="numero_serie"
                    required
                />
                <label>Date d'acquisition:</label>
                <input
                    className={styles.input}
                    type="date"
                    onChange={handleInputChange}
                    name="date_acquisition"
                    required
                />
                <label>Date de maintenance prévue:</label>
                <input
                    className={styles.input}
                    type="date"
                    onChange={handleInputChange}
                    name="maintenance_prevue"
                />

                <label>
                    Actif:
                    <input
                        type="checkbox"
                        checked={equipment.est_actif}
                        onChange={handleInputChange}
                        name="est_actif"
                    />
                </label>

                <div className={styles["caracteristiques-headers"]}>
                    <h4>Caractéristiques</h4>
                    <button
                        type="button"
                        onClick={addCaracField}
                        className={`${styles.button} ${styles["add-caracteristique"]}`}
                    >
                        ➕
                    </button>
                </div>

                {caracteristiques.map((carac, index) => (
                    <div key={index} className={styles.caracteristique}>
                        <div className={styles["caracteristique-section"]}>
                            <label>Nom:</label>
                            <input
                                className={styles.input}
                                name="caracteristique"
                                onChange={(e) => handleCaracChange(index, e)}
                            />
                        </div>
                        <div className={styles["caracteristique-section"]}>
                            <label>Valeur:</label>
                            <input
                                className={styles.input}
                                name="valeur"
                                onChange={(e) => handleCaracChange(index, e)}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => removeCaracField(index)}
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

export default AddEquipment;
