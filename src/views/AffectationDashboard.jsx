import { useEffect, useState } from "react";
import { getAffectations } from "../service/affectationService.js";

const AffectationsDashboard = () => {
    const [affectations, setAffectations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAffectations = async () => {
            try {
                const response = await getAffectations();
                setAffectations(response);
            } catch {
                setError("Erreur lors du chargement des affectations.");
            } finally {
                setLoading(false);
            }
        };

        fetchAffectations();
    }, []);

    return (
        <div className="p-4 bg-white rounded shadow max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Liste des Affectations</h3>

            {loading ? (
                <p>Chargement...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : affectations.length === 0 ? (
                <p>Aucune affectation trouvée.</p>
            ) : (
                <table className="w-full border border-gray-200 text-left text-sm">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 border">Utilisateur</th>
                        <th className="px-4 py-2 border">Équipement</th>
                        <th className="px-4 py-2 border">Date début</th>
                        <th className="px-4 py-2 border">Date fin</th>
                    </tr>
                    </thead>
                    <tbody>
                    {affectations.map((affectation) => (
                        <tr key={affectation.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border">
                                {affectation.nom_utilisateur || "N/A"}
                            </td>
                            <td className="px-4 py-2 border">
                                {affectation.nom_equipement || "N/A"}
                            </td>
                            <td className="px-4 py-2 border">
                                {affectation.date_debut
                                    ? affectation.date_debut.split("T")[0]
                                    : "—"}
                            </td>
                            <td className="px-4 py-2 border">
                                {affectation.date_fin
                                    ? affectation.date_fin.split("T")[0]
                                    : "—"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AffectationsDashboard;
