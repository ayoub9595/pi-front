import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getAffectationById,
    updateAffectation,
} from "../../service/affectationService.js";
import styles from "./EditAffectation.module.css";
import { toast } from "react-hot-toast";

const EditAffectation = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [affectation, setAffectation] = useState({
        id_equipement: "",
        id_utilisateur: "",
        date_debut: "",
        date_fin: "",
    });

    useEffect(() => {
        const fetchAffectation = async () => {
            try {
                const data = await getAffectationById(id);
                setAffectation({
                    id_equipement: data.id_equipement || "",
                    id_utilisateur: data.id_utilisateur || "",
                    date_debut: data.date_debut ? data.date_debut.split("T")[0] : "",
                    date_fin: data.date_fin ? data.date_fin.split("T")[0] : "",
                });
            } catch (err) {
                toast.error(err.message || "Erreur lors du chargement de l'affectation");
            }
        };
        fetchAffectation();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAffectation({ ...affectation, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!affectation.id_equipement || !affectation.id_utilisateur || !affectation.date_debut) {
            toast.error("Les champs équipement, utilisateur et date début sont obligatoires.");
            return;
        }

        try {
            await updateAffectation(id, affectation);
            toast.success("Affectation mise à jour avec succès !");
            navigate("/affectations");
        } catch (err) {
            toast.error(err.message || "Erreur lors de la mise à jour.");
        }
    };

    return (
        <>
            <h2>Modifier une Affectation</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>ID Équipement* :</label>
                <input
                    type="number"
                    name="id_equipement"
                    value={affectation.id_equipement}
                    onChange={handleInputChange}
                    required
                    className={styles.input}
                />

                <label>ID Utilisateur* :</label>
                <input
                    type="number"
                    name="id_utilisateur"
                    value={affectation.id_utilisateur}
                    onChange={handleInputChange}
                    required
                    className={styles.input}
                />

                <label>Date Début* :</label>
                <input
                    type="date"
                    name="date_debut"
                    value={affectation.date_debut}
                    onChange={handleInputChange}
                    required
                    className={styles.input}
                />

                <label>Date Fin :</label>
                <input
                    type="date"
                    name="date_fin"
                    value={affectation.date_fin}
                    onChange={handleInputChange}
                    className={styles.input}
                />

                <button type="submit" className={styles.button}>
                    Enregistrer
                </button>
            </form>
        </>
    );
};

export default EditAffectation;
