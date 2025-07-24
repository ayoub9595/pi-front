import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
    getAffectationById,
    updateAffectation,
} from "../../service/affectationService.js";

import { getAllUtilisateurs } from "../../service/utilisateurService.js";
import {getUnassignedEquipments, getEquipmentById} from "../../service/equipmentService.js";

import styles from "./EditAffectation.module.css";
import UserInfoCard from "../UserInfoCard.jsx";
import UnassignedEquipmentsList from "../EquipmentInfoCard.jsx";
import InfoModal from "../../components/infoModal/InfoModal.jsx";
import Eye from "../../components/icons/Eye.jsx";

const EditAffectation = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [affectation, setAffectation] = useState({
        id_equipement: "",
        id_utilisateur: "",
        date_debut: "",
        date_fin: "",
        determine: false,
    });

    const [utilisateurs, setUtilisateurs] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [showEquipInfo, setShowEquipInfo] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [affData, users, unassignedEqs] = await Promise.all([
                    getAffectationById(id),
                    getAllUtilisateurs(),
                    getUnassignedEquipments(),
                ]);

                let availableEquipments = [...unassignedEqs];
                let currentEquipment = null;

                if (affData.id_equipement) {
                    try {
                        currentEquipment = await getEquipmentById(affData.id_equipement);
                        const isAlreadyInList = unassignedEqs.some(eq => eq.id === currentEquipment.id);
                        if (!isAlreadyInList) {
                            availableEquipments = [currentEquipment, ...unassignedEqs];
                        }
                    } catch (error) {
                        console.warn("Could not fetch current equipment:", error);
                    }
                }

                setAffectation({
                    id_equipement: affData.id_equipement ?? "",
                    id_utilisateur: affData.id_utilisateur ?? "",
                    date_debut: affData.date_debut
                        ? affData.date_debut.split("T")[0]
                        : "",
                    date_fin: affData.date_fin ? affData.date_fin.split("T")[0] : "",
                    determine: Boolean(affData.date_fin),
                });

                setUtilisateurs(users);
                setEquipments(availableEquipments);

                setSelectedUser(users.find((u) => u.id === affData.id_utilisateur));
                setSelectedEquipment(currentEquipment || availableEquipments.find((e) => e.id === affData.id_equipement));
            } catch {
                toast.error("Erreur lors du chargement des données.");
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;

        setAffectation((prev) => ({ ...prev, [name]: val }));

        if (name === "id_utilisateur") {
            const user = utilisateurs.find((u) => u.id === parseInt(value, 10));
            setSelectedUser(user || null);
        }

        if (name === "id_equipement") {
            const equip = equipments.find((eq) => eq.id === parseInt(value, 10));
            setSelectedEquipment(equip || null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !affectation.id_utilisateur ||
            !affectation.id_equipement ||
            !affectation.date_debut
        ) {
            toast.error("Les champs équipement, utilisateur et date début sont obligatoires.");
            return;
        }

        const dataToSend = {
            ...affectation,
            date_fin: affectation.determine ? affectation.date_fin : null,
        };

        try {
            await updateAffectation(id, dataToSend);
            toast.success("Affectation mise à jour avec succès !");
            navigate("/home/affectations");
        } catch (error) {
            toast.error(error.message || "Erreur lors de la mise à jour.");
        }
    };

    return (
        <>
            <h2>Modifier une Affectation</h2>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <label>Équipement :</label>
                <div className={styles["select-section"]}>
                    <select
                        name="id_equipement"
                        value={affectation.id_equipement}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                    >
                        <option value="">-- Sélectionner un équipement --</option>
                        {equipments.map((eq) => (
                            <option key={eq.id} value={eq.id}>
                                {eq.nom || "Sans nom"}
                            </option>
                        ))}
                    </select>
                    <Eye size={30}
                        handleClick={() => {
                            if (!selectedEquipment) {
                                toast.error("Veuillez d'abord sélectionner un équipement.");
                                return;
                            }
                            setShowEquipInfo(true);
                        }}
                    />
                </div>

                <label>Utilisateur :</label>
                <div className={styles["select-section"]}>
                    <select
                        name="id_utilisateur"
                        value={affectation.id_utilisateur}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                    >
                        <option value="">-- Sélectionner un utilisateur --</option>
                        {utilisateurs.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.nom}
                            </option>
                        ))}
                    </select>
                    <Eye size={30}
                         handleClick={() => {
                            if (!selectedUser) {
                                toast.error("Veuillez d'abord sélectionner un utilisateur.");
                                return;
                            }
                            setShowUserInfo(true);
                        }}
                    />
                </div>

                <label>Date Début* :</label>
                <input
                    type="date"
                    name="date_debut"
                    value={affectation.date_debut}
                    onChange={handleInputChange}
                    required
                    className={styles.input}
                />

                <label>
                    <input
                        type="checkbox"
                        name="determine"
                        checked={affectation.determine}
                        onChange={handleInputChange}
                        className={styles.checkbox}
                    />
                    {" "}Déterminé
                </label>

                {affectation.determine && (
                    <>
                        <label>Date Fin :</label>
                        <input
                            type="date"
                            name="date_fin"
                            value={affectation.date_fin}
                            onChange={handleInputChange}
                            className={styles.input}
                        />
                    </>
                )}

                <div className="flex gap-4 mt-4">
                    <button type="submit" className={styles.button}>
                        Enregistrer
                    </button>
                </div>
            </form>
            {showUserInfo && selectedUser && (
                <InfoModal title="Informations Utilisateur" onClose={() => setShowUserInfo(false)}>
                    <UserInfoCard user={selectedUser} />
                </InfoModal>
            )}

            {showEquipInfo && selectedEquipment && (
                <InfoModal title="Informations Équipement" onClose={() => setShowEquipInfo(false)}>
                    <UnassignedEquipmentsList equipment={selectedEquipment} />
                </InfoModal>
            )}
        </>
    );
};

export default EditAffectation;