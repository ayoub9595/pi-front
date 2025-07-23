import styles from "./addAffectation/AddAffectation.module.css"
const UnassignedEquipmentsList = ({ equipment }) => {
    return (
        <div className={styles.card}>
                       <p><strong>Nom :</strong> {equipment.nom || "N/A"}</p>
                        <p><strong>Description :</strong> {equipment.description || "N/A"}</p>
                        <p><strong>N° Série :</strong> {equipment.numero_serie || "N/A"}</p>
                        <p><strong>Caracteristiques :</strong></p>
                        {equipment.caracteristiques && equipment.caracteristiques.length > 0 && (
                            <ul>
                                {equipment.caracteristiques.map((carac, index) => (
                                    <li key={index}>
                                        {carac.caracteristique}: {carac.valeur}
                                    </li>
                                ))}
                            </ul>
                        )}

        </div>
    );
};

export default UnassignedEquipmentsList;
