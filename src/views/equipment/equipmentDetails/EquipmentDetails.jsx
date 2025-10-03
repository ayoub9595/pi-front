import InfoModal from "../../../components/infoModal/InfoModal.jsx";
import styles from "./EquipmentDetails.module.css";

const EquipmentDetails = ({ equipment, handleClose }) => {
    return (
        <InfoModal title="Détails de l'équipement" onClose={handleClose}>
            <div className={styles['equipment-infos']}>
                <p className={styles.p}>
                    <strong>Nom:</strong> {equipment.nom}
                </p>
                <p className={styles.p}>
                    <strong>Description:</strong> {equipment.description || "-"}
                </p>
                <p className={styles.p}>
                    <strong>Numéro de Série:</strong> {equipment.numero_serie || "-"}
                </p>
                <p className={styles.p}>
                    <strong>Date d'Acquisition:</strong> {equipment.date_acquisition?.split("T")[0] || "-"}
                </p>
                <p className={styles.p}>
                    <strong>Maintenance Prévue:</strong> {equipment.maintenance_prevue?.split("T")[0] || "-"}
                </p>
                <p className={styles.p}>
                    <strong>Statut:</strong> {equipment.est_actif ? '✅ Actif' : '❌ Inactif'}
                </p>
            </div>

            {equipment.caracteristiques && equipment.caracteristiques.length > 0 && (
                <>
                    <h3 className={styles.heading}>Caractéristiques</h3>
                    <div className={styles['caracteristiques-list']}>
                        {equipment.caracteristiques.map((carac, index) => (
                            <div key={index} className={styles['caracteristique-item']}>
                                <strong>{carac.caracteristique}:</strong> {carac.valeur}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </InfoModal>
    );
};

export default EquipmentDetails;