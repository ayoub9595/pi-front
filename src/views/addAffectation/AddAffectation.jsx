import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { createAffectation } from "../../service/affectationService.js";
import { getAllUtilisateurs } from "../../service/utilisateurService.js";
import { getUnassignedEquipments } from "../../service/equipmentService.js";

import styles from "./AddAffectation.module.css";
import UserInfoCard from "../UserInfoCard.jsx";
import UnassignedEquipmentsList from "../EquipmentInfoCard.jsx";
import InfoModal from "../../components/infoModal/InfoModal.jsx";
import Eye from "../../components/icons/Eye.jsx";

const AddAffectation = () => {
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
        async function fetchData() {
            try {
                const users = await getAllUtilisateurs();
                const unassigned = await getUnassignedEquipments();
                setUtilisateurs(users);
                setEquipments(unassigned);
            } catch (error) {
                toast.error("Erreur de chargement des données.");
            }
        }
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === "checkbox" ? checked : value;

        setAffectation({ ...affectation, [name]: val });

        if (name === "id_utilisateur") {
            const user = utilisateurs.find((u) => u.id === parseInt(value));
            setSelectedUser(user || null);
        }

        if (name === "id_equipement") {
            const equip = equipments.find((eq) => eq.id === parseInt(value));
            setSelectedEquipment(equip || null);
        }
    };

    const showEquipmentDetails = () => {
        if (!selectedEquipment) {
            toast.error("Veuillez sélectionner un équipement d'abord");
            return;
        }
        setShowEquipInfo(true);

    }

    const showUserDetails = () => {
        if (!selectedUser) {
            toast.error("Veuillez sélectionner un utilisateur d'abord");
            return;
        }
        setShowUserInfo(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!affectation.id_equipement || !affectation.id_utilisateur || !affectation.date_debut) {
            toast.error("Les champs équipement, utilisateur et date début sont obligatoires.");
            return;
        }

        try {
            await createAffectation(affectation);
            toast.success("Affectation créée avec succès !");
            navigate("/home/affectations");
        } catch (err) {
            toast.error(err.message || "Erreur lors de la création.");
        }
    };

    return (
        <>
            <h2>Créer une Affectation</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>
                    Équipement :
                </label>
                <div className={styles['select-section']}>
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
                                {eq.nom || "Sans description"}
                            </option>
                        ))}
                    </select>
                    <Eye handleClick={showEquipmentDetails} />
                </div>

                <label>
                    Utilisateur :
                </label>
                <div className={styles['select-section']}>
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
                    <Eye handleClick={showUserDetails} />
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
                    />{" "}
                    Déterminé
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

                <button type="submit" className={styles.button}>
                    Enregistrer
                </button>
            </form>

            {showUserInfo && selectedUser && (
                <InfoModal title="Informations Utilisateur" onClose={() => setShowUserInfo(false)}>
                    <UserInfoCard user={selectedUser} />
                </InfoModal>
            )}

            {showEquipInfo && selectedEquipment && (
                <InfoModal title="Équipement sélectionné"
                           onClose={() => setShowEquipInfo(false)}>
                    <UnassignedEquipmentsList equipment={selectedEquipment} />
                </InfoModal>
            )}
        </>
    );
};

export default AddAffectation;
