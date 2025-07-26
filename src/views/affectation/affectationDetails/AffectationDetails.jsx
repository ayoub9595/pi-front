import InfoModal from "../../../components/infoModal/InfoModal.jsx";
import UserInfoCard from "../../UserInfoCard.jsx";
import UnassignedEquipmentsList from "../../EquipmentInfoCard.jsx";
import styles from "./AffectationDetails.module.css";

const AffectationDetails = ({affectation,handleClose}) => {
    return (

            <InfoModal title="Détails de l'affectation" onClose={handleClose}>
                <div className={styles['affectation-infos']}>
                    <p className={styles.p}><strong>Affectation determinée ?</strong> {affectation.determine ? '✅' : '❌'}</p>
                    <p className={styles.p}><strong>Date de debut:</strong> {affectation.date_debut.split("T")[0] || "-"}</p>
                    {affectation.determine && <p className={styles.p}><strong>Date de fin:</strong> {affectation.date_fin.split("T")[0] || "-"}</p>}
                </div>
                <h3>Utilisateur</h3>
                <UserInfoCard user={{
                    nom: affectation.utilisateur.nom,
                    cin: affectation.utilisateur.cin,
                    email: affectation.utilisateur.email,
                    telephone: affectation.utilisateur.telephone,
                }} />

                <h3>Équipement</h3>
                <UnassignedEquipmentsList equipment={{
                    nom: affectation.equipement.nom,
                    description: affectation.equipement.description,
                    numero_serie: affectation.equipement.numero_serie,
                    caracteristiques: affectation.equipement.caracteristiques,
                }} />
            </InfoModal>
    )
}
export default AffectationDetails;