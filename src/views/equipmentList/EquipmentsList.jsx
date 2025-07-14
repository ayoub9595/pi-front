import { useEffect, useState } from "react";
import { getEquipments } from "../../service/equipmentService.js";

const EquipmentsList = () => {
    const [equipments, setEquipments] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchEquipments = async () => {
            try {
                const data = await getEquipments();
                setEquipments(data);
            } catch (err) {
                setError("Erreur lors du chargement des équipements");
            }
        };

        fetchEquipments();
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Liste des Équipements</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Numéro de Série</th>
                    <th>Date d'Acquisition</th>
                    <th>Maintenance Prévue</th>
                    <th>Actif</th>
                    <th>Caractéristiques</th>
                </tr>
                </thead>
                <tbody>
                {equipments.map((eq) => (
                    <tr key={eq.id}>
                        <td>{eq.nom}</td>
                        <td>{eq.description || "-"}</td>
                        <td>{eq.numero_serie || "-"}</td>
                        <td>{eq.date_acquisition || "-"}</td>
                        <td>{eq.maintenance_prevue || "-"}</td>
                        <td>{eq.est_actif ? "Oui" : "Non"}</td>
                        <td>
                            <ul style={{ paddingLeft: "16px" }}>
                                {eq.caracteristiques.map((carac, index) => (
                                    <li key={index}>
                                        <strong>{carac.caracteristique}</strong>: {carac.valeur}
                                    </li>
                                ))}
                            </ul>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default EquipmentsList;
