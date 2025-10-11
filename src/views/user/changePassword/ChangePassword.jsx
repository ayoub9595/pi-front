import {useState} from "react";
import styles from "./ChangePassword.module.css";
import Eye from "../../../components/icons/Eye.jsx";
import {toast} from "react-hot-toast";
import {changePassword} from "../../../service/AuthenticationService.js";
import {useNavigate} from "react-router-dom";

const ChangePassword = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        ancien_mot_de_passe: '',
        nouveau_mot_de_passe: '',
        confirmer_mot_de_passe: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const validateForm = () => {
        const {nouveau_mot_de_passe, confirmer_mot_de_passe} = formData;
        if(nouveau_mot_de_passe !== confirmer_mot_de_passe) {
            toast.error("Les mots de passes ne sont pas identiques")
            return false;
        }
        return true;


    };

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(!validateForm()) {
            return
        }
        try {
            const {ancien_mot_de_passe,nouveau_mot_de_passe} = formData;
            await changePassword({ancien_mot_de_passe,nouveau_mot_de_passe});
            toast.success("Mot de passe modifié avec succès !",{duration: 4000});
            navigate("/home/affectations");

        }catch (err) {
            toast.error(err.message || "Une erreur est survenue", { duration: 2000 });
        }
    }

    return (
        <>
            <h2>Changer de mot de passe</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label>Ancien mot de passe:</label>
                <div className={styles["input-field"]}>
                    <input
                        className={styles.input}
                        type={showOldPassword ? 'text' : 'password'}
                        name="ancien_mot_de_passe"
                        value={formData.ancien_mot_de_passe}
                        onChange={handleChange}
                        required
                    />
                    <Eye size={26} handleClick={() => setShowOldPassword(prev => !prev)} />
                </div>

                <label>Nouveau mot de passe:</label>
                <div className={styles["input-field"]}>
                    <input
                        className={styles.input}
                        type={showNewPassword ? 'text' : 'password'}
                        name="nouveau_mot_de_passe"
                        value={formData.nouveau_mot_de_passe}
                        onChange={handleChange}
                        required
                    />
                    <Eye size={26} handleClick={() => setShowNewPassword(prev => !prev)} />
                </div>

                <label>Confirmer mot de passe:</label>
                <div className={styles["input-field"]}>
                    <input
                        className={styles.input}
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmer_mot_de_passe"
                        value={formData.confirmer_mot_de_passe}
                        onChange={handleChange}
                        required
                    />
                    <Eye size={26} handleClick={() => setShowConfirmPassword(prev => !prev)} />
                </div>

                <button className={styles.button}>Enregistrer</button>
            </form>
        </>
    )
}

export default ChangePassword;