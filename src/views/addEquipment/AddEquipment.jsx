import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEquipment } from "../../service/equipmentService";
import styles from "./AppEquipment.module.css";

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

    const [caracteristiques, setCaracteristiques] = useState([
        { caracteristique: "", valeur: "" },
    ]);

    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

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
        const updated = caracteristiques.filter((_, i) => i !== index);
        setCaracteristiques(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const fullData = {
                ...equipment,
                caracteristiques: caracteristiques.filter(
                    (c) => c.caracteristique.trim() && c.valeur.trim()
                ),
            };

            await createEquipment(fullData);
            setSuccess("Équipement ajouté avec succès !");
            setTimeout(() => navigate("/home/equipement"), 1500);
        } catch (err) {
            setError(err.message || "Erreur lors de l'ajout.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.subcontainer}>
                <h2>Ajouter un Équipement</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input className={styles.input} name="nom" placeholder="Nom" value={equipment.nom} onChange={handleInputChange} required />
                    <textarea className={styles.input} name="description" placeholder="Description" value={equipment.description} onChange={handleInputChange} />
                    <input className={styles.input} name="numero_serie" placeholder="Numéro de série" value={equipment.numero_serie} onChange={handleInputChange} />
                    <input className={styles.input} type="date" name="date_acquisition" value={equipment.date_acquisition} onChange={handleInputChange} />
                    <input className={styles.input} type="date" name="maintenance_prevue" value={equipment.maintenance_prevue} onChange={handleInputChange} />

                    <label>
                        Actif:
                        <input type="checkbox" name="est_actif" checked={equipment.est_actif} onChange={handleInputChange} />
                    </label>

                    <h4>Caractéristiques</h4>
                    {caracteristiques.map((carac, index) => (
                        <div key={index} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                            <input
                                className={styles.input}
                                type="text"
                                name="caracteristique"
                                placeholder="Nom"
                                value={carac.caracteristique}
                                onChange={(e) => handleCaracChange(index, e)}
                            />
                            <input
                                className={styles.input}
                                type="text"
                                name="valeur"
                                placeholder="Valeur"
                                value={carac.valeur}
                                onChange={(e) => handleCaracChange(index, e)}
                            />
                            {index > 0 && (
                                <button type="button" onClick={() => removeCaracField(index)} className={styles.button}>
                                    ❌
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addCaracField} className={styles.button}>
                        ➕ Ajouter une caractéristique
                    </button>

                    <button type="submit" className={styles.button}>
                        Enregistrer
                    </button>
                    {success && <p style={{ color: "green" }}>{success}</p>}
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default AddEquipment;
