import { useState } from "react";
import styles from "./ProcessReclamation.module.css";
import LoaderForButton from "../../../components/loaderForButton/LoaderForButton.jsx";

const reclamationsStatus =['Non traitée','Acceptée','Refusée']

const ProcessReclamation = ({ onSubmit, onCancel }) => {

    const [reclamation, setReclamation] = useState({
        etat_reclamation: 'Non traitée',
        commentaire: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        setReclamation({...reclamation, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        onSubmit(reclamation);
    };

    return (
        <div className={styles["modal-background"]}>
            <div className={styles["modal-content"]}>
                <h3>Traitement de la réclamation</h3>
                <form onSubmit={handleSubmit} className={styles["form"]}>
                    <label>Statut de la demande:</label>
                     <select onChange={handleChange} name="etat_reclamation">
                         {reclamationsStatus.map(status => (
                             <option key={status} value={status}>{status}</option>
                         ))}
                     </select>
                    <label>Commentaire:</label>
                    <textarea
                        onChange={handleChange}
                        rows={5}
                        name="commentaire"
                    />
                    <div className={styles.buttons}>
                        <button disabled={reclamation.etat_reclamation === 'Non traitée' || loading} className={styles.submitBtn}>
                            {loading ? <LoaderForButton /> :'Valider'}
                        </button>
                        <button type="button" onClick={onCancel} className={styles.cancelBtn}>
                            Annuler
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProcessReclamation;
