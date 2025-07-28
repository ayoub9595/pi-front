import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {toast} from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {getEquipementsActifsByUtilisateurId} from "../../../service/affectationService.js";
import {createReclamation} from "../../../service/reclamationService.js";
import styles from './CreateReclamation.module.css';

const CreateReclamation = () => {
    const [equipements, setEquipements] = useState([]);
    const [selectedEquipementId, setSelectedEquipementId] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const utilisateurId = useSelector(state => state.auth.id);

    useEffect(() => {
        const fetchEquipements = async () => {
            try {
                if (!utilisateurId) return;
                const data = await getEquipementsActifsByUtilisateurId(utilisateurId);
                setEquipements(data);
            } catch (error) {
                toast.error("Erreur lors du chargement des équipements.");
            }
        };

        fetchEquipements();
    }, [utilisateurId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedEquipementId || !description.trim()) {
            toast.error("Veuillez remplir tous les champs.");
            return;
        }

        try {
            await createReclamation({
                id_utilisateur: utilisateurId,
                id_equipement: selectedEquipementId,
                description: description.trim(),
            });

            toast.success("Réclamation envoyée avec succès !");
            navigate("/home/affectations");
        } catch (error) {
            toast.error(error?.message || "Erreur lors de l'envoi de la réclamation.");
        }
    };

    return (
        <>
            <h2>Nouvelle Réclamation</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label>Équipement concerné :</label>
                <select
                    value={selectedEquipementId}
                    onChange={(e) => setSelectedEquipementId(e.target.value)}
                    required
                    className={styles.input}
                >
                    <option value="">-- Choisissez un équipement --</option>
                    {equipements.map((equipement) => (
                        <option key={equipement.id} value={equipement.id}>
                            {equipement.nom}
                        </option>
                    ))}
                </select>

                <label>Description du problème :</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.textarea}
                    rows={5}
                    required
                />

                <button type="submit" className={styles.button}>
                    Envoyer
                </button>
            </form>
        </>
    );
};

export default CreateReclamation;   