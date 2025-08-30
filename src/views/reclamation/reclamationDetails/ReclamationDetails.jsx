import { useState } from "react";
import InfoModal from "../../../components/infoModal/InfoModal.jsx";
import ProcessReclamation from "../accepterForm/ProcessReclamation.jsx";
import styles from "./ReclamationDetails.module.css";
import {useSelector} from "react-redux";

const ReclamationDetails = ({ reclamation, onClose, onProcess }) => {
    const [showProcessForm, setShowProcessForm] = useState(false);

    const { role } = useSelector((state) => state.auth);

    const handleAcceptClick = () => {
        setShowProcessForm(true);
    };

    const handleCancel = () => {
        setShowProcessForm(false);
    };

    const handleProcess = reclamation => {
        onProcess(reclamation);
    }

    return (
        <InfoModal title="Infos de la réclamation" onClose={onClose}>
            <h3>Utilisateur</h3>
            <div className={styles["reclamation-details"]}>
                <p><strong>Nom :</strong> {reclamation.utilisateur?.nom ?? "—"}</p>
                <p><strong>Email :</strong> {reclamation.utilisateur?.email ?? "—"}</p>
                <p><strong>Téléphone :</strong> {reclamation.utilisateur?.telephone ?? "—"}</p>
                <p><strong>CIN :</strong> {reclamation.utilisateur?.cin ?? "—"}</p>
            </div>

            <h3>Équipement</h3>
            <div className={styles["reclamation-details"]}>
                <p><strong>Nom :</strong> {reclamation.equipement?.nom ?? "—"}</p>
                <p><strong>Numéro de série :</strong> {reclamation.equipement?.numero_serie ?? "—"}</p>
                <p><strong>Date d'acquisition :</strong> {reclamation.equipement?.date_acquisition ?? "—"}</p>
                <p><strong>Maintenance prévue :</strong> {reclamation.equipement?.maintenance_prevue ?? "—"}</p>

                {reclamation.equipement?.caracteristiques?.length > 0 && (
                    <>
                        <p><strong>Caractéristiques :</strong></p>
                        <ul className={styles.ul}>
                            {reclamation.equipement.caracteristiques.map((carac, idx) => (
                                <li key={idx} className={styles.li}>
                                    {carac.caracteristique}: {carac.valeur}
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
            <h3>Etat de la demande:</h3>
            <div className={styles["reclamation-details"]}>
                <p><strong>Etat :</strong> {reclamation.etat_reclamation ?? "—"}</p>
                {reclamation.etat_reclamation !== "Non traitée" &&<p><strong>Commentaire :</strong> {reclamation.commentaire ?? "—"}</p>}
            </div>
            {reclamation.etat_reclamation === "Non traitée" && !showProcessForm && role === 'ADMIN' && (
                <div className={styles.actions}>
                    <button className={styles['process-btn']} onClick={handleAcceptClick}>Traiter</button>
                </div>
            )}

            {showProcessForm && (
                <ProcessReclamation
                equipement={reclamation.equipement}
                onSubmit={handleProcess}
                onCancel={handleCancel}
                />
            )}


        </InfoModal>
    );
};

export default ReclamationDetails;
